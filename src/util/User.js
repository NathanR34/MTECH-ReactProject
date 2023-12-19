
import { createContext, useContext, useState, useEffect, useCallback } from "react";

import storageInterface from "./storage";
import { produce } from 'immer';
import { useGlobal } from './Global'

let userExports = {};

{
    
    const CRED_TOKEN = {current:null, confirm:null};

    const sanitizeName = function sanitizeName(name){
        name = String(name);
        let len = Math.min(name.length, 40);
        let codes = Array(len);
        for(let i=0; i<len; i++){
            let code = name.charCodeAt(i);
            if((97<=code && code<123)||(101<=code && code<91)||(48<=code && code<58)||code===95){
                codes[i] = code;
            } else {
                codes[i] = 95;
            }
        }
        return String.fromCharCode(...codes);
    }

    function userNameAvailable(name){
        if(sanitizeName(name) !== name) return false;
        return !storageInterface.cred.has(`users/${name}/`);
    }
    function createUser(name, credAccess){
        let cred = confirmCred(credAccess) || "";
        if(userNameAvailable(name)){
            return !!storageInterface.cred.create(`users/${name}/`, cred);
        }
        return false;
    }

    const userUtil = {
        available: userNameAvailable,
        create: createUser
    }


    const UserContext = createContext({name:"", isLoggedIn: false/*, accessPublic:()=>{}, profiles:[]*/});
    const ProfileContext = createContext(null);

    /*function userExists(name){
        return storageInterface.cred.has(`users/${name}/`)?"user":"none"
    }*/

    class ProfileInfo {
        constructor({ cred="", owner, name }={}){
            this.name = sanitizeName(name||"");
            this.owner = sanitizeName(owner||"");
            this.domain = this.owner + "/" + this.name;
            this.cred = makeCred(cred || "");
        }
        status(status="none"){
            return new ProfileInfo(this.name, this, this.owner, status);
        }
    }

    function useImmerUpdater(initial){
        const [state, setState] = useState(initial);
        return [
            state, setState, 
            function updateState(fn){ setState(stateArg=>produce(stateArg||{}, fn)) }
        ];
    }

    function User({name:appliedName, children}){
        appliedName = sanitizeName(appliedName);
        const [name, setName] = useState(appliedName);
        const [storage, setStorage] = useState(null);
        //const [publicData, setPublicData, updatePublicData] = useImmerUpdater(null);
        const [data, setData, updateData] = useImmerUpdater(null);
        const [profiles, setProfiles] = useState({names:[], get:()=>null});
        const global = useGlobal();

        const isLoggedIn = !!storage;

        if(appliedName !== name){
            setStorage(null);
            setData(null);
            //setPublicData(null);
            setName(appliedName);
        }

        function logOut(){
            setStorage(null);
            setData(null);
            global.user.setStatus(name, "none");
        };
        
        function profileAvailable(profileName){
            if(profileName === sanitizeName(profileName)){
                return !storageInterface.cred.has(`profiles/${name}/${profileName}/`);
            }
            return false;
        }
        function createProfile(profileName, credAccess){
            let cred = confirmCred(credAccess) || "";
            if(isLoggedIn){
                if(profileAvailable(profileName)){
                    let success = storageInterface.cred.create(`profiles/${name}/${profileName}/`, cred);
                    if(success){
                        updateData((draft)=>{
                            if(!draft.profiles){
                                draft.profiles = [];
                            }
                            draft.profiles.push({name:profileName, owner:name, cred: cred});
                        });
                    }
                }
            }
            return false;
        }

        const profileData = (data&&data.profiles)||null;
        const publicProfileData = null;//(publicData&&publicData.profiles)||null;

        const logIn = useCallback(function logIn(user){
            if(user.status === "accepted" && isLoggedIn) return;
            let cred = confirmCred(user.cred) || "";
            let userStorage = storageInterface.cred.get(`users/${name}/`, cred) || null;
            if(userStorage){
                setStorage(userStorage);
                setData(userStorage.load()||{});
                if(user.status !== "accepted"){
                    global.user.setStatus(name, "accepted");
                }
            } else {
                global.user.setStatus(name, "denied");
            }
        }, [isLoggedIn, name, setData, global.user]);

        useEffect(function(){
            const user = global.user.get(name);
            if(user){
                switch(user.status){
                case "denied":
                    setStorage(null);
                    setData(null);
                    global.user.setStatus(name, "none");
                    break;
                case "accepted":
                case "pending":
                    logIn(user);
                    break;
                default:
                    break;
                }
            }
        }, [global.user, logIn, name, setData]);

        useEffect(function(){
            let profileList = {};
            if(publicProfileData){
                for(let profile of publicProfileData){
                    profile = new ProfileInfo(profile);
                    profileList[profile.domain] = profile;
                }
            }
            if(profileData){
                for(let profile of profileData){
                    profile = new ProfileInfo(profile);
                    profileList[profile.domain] = profile;
                }
            }
            let names = [];
            for(let domain in profileList){
                let profile = profileList[domain];
                names.push(profile.name);
            }
            let profiles = {
                get: function(domain){
                    return profileList[domain] || null;
                },
                names: names
            }
            setProfiles(profiles);
        }, [publicProfileData, profileData]);
        
        useEffect(function(){
            if(storage){
                if(data){
                    storage.save(data);
                } else {
                    setData(storage.load()||{});
                }
            } else if(data){
                setData(null);
            }
        }, [data, storage, setData]);

        let user = {
            isLoggedIn: isLoggedIn,
            name: name,
            profiles: profiles,
            profile: {
                create: createProfile, 
                isAvailable: profileAvailable
            }
        }
        
        if(isLoggedIn){
            user.data = data;
            user.update = updateData;
            user.logOut = logOut;
        }

        
        
        return <UserContext.Provider value={user}>
            {children}
        </UserContext.Provider>
    }

    function useUser(){
        return useContext(UserContext);
    }

    function Profile({children, name, owner}){
        const user = useUser();
        if(!owner && user) owner = user.name;
        owner = sanitizeName(owner);
        name = sanitizeName(name);
        const appliedDomain = `${owner}/${name}`;
        const [domain, setDomain] = useState({domain:appliedDomain, name:name, owner:owner});
        const [storage, setStorage] = useState(null);
        const [data, setData, updateData] = useImmerUpdater(null);
        const [status, setStatus] = useState("pending");
        const hasAccess = !!storage;

        if(appliedDomain !== domain.domain){
            setStorage(null);
            setData(null);
            setDomain({domain:appliedDomain, name:name, owner:owner});
        }

        function lock(){
            setStorage(null);
            setData(null);
            setStatus("lock");
        }
        function unlock(){
            setStatus("pending");
        }

        useEffect(function(){
            if(storage){
                if(data){
                    storage.save(data);
                } else {
                    setData(storage.load()||{});
                }
            } else if(data){
                setData(null);
            }
        }, [data, storage, setData]);

        const userProfiles = (user && user.profiles) || null;

        const access = useCallback(function access(credAccess){
            let cred = credAccess?(confirmCred(credAccess) || ""):"";
            let storage = storageInterface.cred.get(`profiles/${domain.owner}/${domain.name}/`, cred) || null;
            if(storage){
                setStorage(storage);
                setData(storage.load()||{});
                if(status !== "access"){
                    setStatus("access");
                }
                return true;
            } else if(status !== "pending"){
                setStatus("pending");
            }
            return false;
        }, [domain.name, domain.owner, setData, status])

        useEffect(function(){
            switch(status){
            case "access":
                if(!hasAccess){
                    if(userProfiles){
                        let profile = userProfiles.get(domain.domain);
                        if(profile){
                            access(profile.cred);
                        }
                    }
                };
                break;
            case "pending":
                if(userProfiles){
                    let profile = userProfiles.get(domain.domain);
                    if(profile){
                        access(profile.cred);
                    }
                }
                break;
            case "lock":
                if(hasAccess){
                    setStorage(null);
                    setData(null);
                }
                break;
            default:
                break;
            }
        }, [userProfiles, status, domain.name, domain.domain, hasAccess, setData, access]);

        let profile = {
            name: domain.name,
            owner: domain.owner,
            hasAccess: hasAccess
        };

        if(hasAccess){
            profile.lock = lock;
            profile.data = data;
            profile.update = updateData;
        } else {
            profile.unlock = unlock;
            profile.access = access;
        }

        return <ProfileContext.Provider value={profile}>
            {children}
        </ProfileContext.Provider>
    }

    function useProfile(){
        return useContext(ProfileContext);
    }

    function makeCred(cred){
        if(typeof cred === "function") return cred;
        return function(confirm){
            if(confirm === CRED_TOKEN.confirm){
                CRED_TOKEN.current = cred;
            }
        }
    }
    function confirmCred(access){
        let confirm = {};
        CRED_TOKEN.current = null;
        CRED_TOKEN.confirm = confirm;
        if(access){
            access(confirm);
        }
        let cred = CRED_TOKEN.current;
        CRED_TOKEN.current = null;
        CRED_TOKEN.confirm = null;
        return cred;
    }

    userExports = {
        userUtil: userUtil,
        User: User,
        useUser: useUser,
        Profile: Profile,
        useProfile: useProfile,
        makeUserCred: makeCred
    }
}

export const userUtil = userExports.userUtil;
export const User = userExports.User;
export const useUser = userExports.useUser;
export const Profile = userExports.Profile;
export const useProfile = userExports.useProfile;
export const makeUserCred = userExports.makeUserCred;
export const confirm = userExports.confirm;