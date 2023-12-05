
import { createContext, useContext, useSyncExternalStore, useMemo } from "react";

import { credTool } from "./cred";

import storage from "./storage";

import { useDataBoundReducer } from "./hooks";


const UserContext = createContext(null);
const UserStateContext = createContext(null);
const ProfileContext = createContext(null);


const sanitizeName = function sanitizeName(name){
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

export function useUserReducer(reducer){
    const [user] = useContext(UserContext);
    return useDataBoundReducer(reducer, user);
}

export function useUserActions(){
    const [user] = useContext(UserContext);
    return user ? user.actions : null;
}

function userNameAvailable(name){
    if(sanitizeName(name) !== name) return false;
    return !storage.cred.has(`users/${name}/`);
}
function createUser(name, cred){
    if(userNameAvailable(name)){
        return !!storage.cred.create(`users/${name}/`, cred);
    }
    return false;
}

export const userUtil = {
    available: userNameAvailable,
    create: createUser
}

class UserAccount {
    constructor(name){
        this.name = sanitizeName(name);
        this.profiles = {}
        this.storage = undefined;
        this._data = {}
        this.listeners = new Set();
        this.stateListeners = new Set();
        this.toggleState = false;
        this.registerActions();
    }
    get isLoggedIn(){
        return !!this.storage;
    }
    logIn(cred){
        this.storage = storage.cred.get(`users/${this.name}/`, cred);
        if(this.isLoggedIn){
            this.toggle();
            this.data = this.storage.load();
        }
        return this.isLoggedIn;
    }
    logOut(){
        this.storage = null;
        this.toggle();
        return !this.isLoggedIn;
    }
    profileAvailable(profileName){
        if(this.isLoggedIn && profileName === sanitizeName(profileName)){
            return !storage.cred.has(`profiles/${this.name}/${profileName}/`);
        }
        return false;
    }
    createProfile(name, cred=null){
        if(this.profileAvailable(name)){
            let success = storage.cred.create(`profiles/${this.name}/${name}/`, cred);
            if(success){
                this.storage.get(`profiles/${this.name}/${name}`).save(cred);
            }
        }
        return false;
    }
    getProfile(name, owner=null, getCred=null){
        owner = sanitizeName((owner !== null)? owner : this.name);
        name = sanitizeName(name);
        let profile;
        if(name in this.profiles){
            profile = this.profiles[name];
        } else {
            profile = new ProfileData(name);
            this.profiles[name] = profile;
        }
        if(!profile.isSetup){
            
            let cred;
            if(this.isLoggedIn) {
                let profiles = this.storage.get(`profiles`).load() || {};
                if(owner in profiles){
                    profiles = profiles[owner];
                    if(name in profiles){
                        let profiles = profiles[name];
                        if("cred" in profiles){
                            profile.access(profiles.cred);
                        }
                    }
                }
            }
            if(getCred && !profile.isSetup){
                profile.access(getCred());
            }
        }
        return profile;
    }
    get data(){
        return this._data || (this._data = {});
    }
    set data(data){
        if(!Object.is(data, this._data)){
            this._data = data;
            for(let listener of this.listeners){
                listener();
            }
            if(this.storage){
                this.storage.save(data);
            }
        }
    }
    registerActions(){
        const user = this;
        this.actions = {
            logIn(cred){
                return user.logIn(cred);
            },
            logOut(cred){
                return user.logOut(cred);
            },
            createProfile(name, cred){
                return user.createProfile(name, cred);
            },
            profileAvailable(){
                return user.profileAvailable();
            },
            getLogInStatus(){
                return user.isLoggedIn;
            }
        }
    }
    toggle(){
        this.toggleState = !this.toggleState;
        for(let listener of this.stateListeners){
            listener();
        }
    }
}

export function useProfileReducer(reducer){
    const profile = useContext(ProfileContext);
    return useDataBoundReducer(reducer, profile);
}

export function useProfileActions(){
    const profile = useContext(ProfileContext);
    return profile? profile.actions : null;
}

class ProfileData {
    constructor(name, owner){
        this.owner = sanitizeName(owner.name);
        this.name = sanitizeName(name);
        this._data = {};
        this.storage = null;
        this.listeners = new Set();
        this.registerActions();
    }
    get data(){
        return this._data;
    }
    set data(data){
        if(!Object.is(data, this._data) && this.storage){
            this._data = data;
            for(let listener of this.listeners){
                listener();
            }
            if(this.storage){
                this.storage.save(data);
            }
        }
    }
    get isSetup(){
        return !!this.storage;
    }
    access(cred){
        this.storage = storage.cred.get(`profiles/${this.owner}/${this.name}/`, cred);
        if(this.isSetup){
            this.data = this.storage.load();
        } else {
            this.storage = null;
        }
    }
    registerActions(){
        const profile = this;
        this.actions = {
            
        }
    }
}

const getUser = (function(){
    const users = {};
    return function(name=null){
        if(name === null) return null;
        name = sanitizeName(name);
        if(name in users){
            return users[name];
        } else {
            let account = new UserAccount(name);
            users[name] = account;
            return account;
        }
    }
})();

export function UserDomain({children, user=null}){
    if(user !== null){ user = getUser(user) || null; }
    const store = useMemo(function(){
        if(user && !user.stateListeners) user.stateListeners = new Set();
        return {
            getSnapshot: user? function(){
                return user.toggleState;
            } : ()=>null,
            subscribe: user? function(listener){
                user.stateListeners.add(listener);
                return (l)=>user.stateListeners.delete(l);
            } : ()=>()=>undefined
        }
    }, [user]);
    const userData = useMemo(function(){return [user, user.toggleState]}, [user, user.toggleState]);
    useSyncExternalStore(store.subscribe, store.getSnapshot);
    return <UserContext.Provider value={userData}>
        {children}
    </UserContext.Provider>;
}
export function ProfileDomain({children, profile=null, owner=null, getCred=null}){
    const user = useContext(UserContext);
    if(profile !== null){
        owner = (owner===null)? user : getUser(owner);
        profile = owner? owner.getProfile(profile, getCred) : null;
    }
    return <ProfileContext.Provider value={profile}>
        {children}
    </ProfileContext.Provider>;
}
