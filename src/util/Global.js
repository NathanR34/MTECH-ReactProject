
import { useContext, createContext, useState } from 'react'


const GlobalContext = createContext(null);

export function Global({children}){
    const [users, setUsers] = useState({});
    function setStatus(name, status){
        if(name in users){
            let user = {cred:users[name].cred, status:status};
            setUsers({...users, [name]:user});
        }
    }
    function setUser(name, cred=null, status=false){
        if(cred){
            setUsers({...users, [name]:{cred:cred, status:status?"pending":"none"}});
        } else {
            let usersClone = {...users};
            delete usersClone[name];
            setUsers(usersClone);
        }
    }

    const global = {
        user: {
            set: setUser,
            setStatus: setStatus,
            get: function(name){
                if(name in users){
                    let user = users[name];
                    return {cred: user.cred, status: user.status};
                }
                return null;
            }
        }
    };
    
    return <GlobalContext.Provider value={global}>
        {children}
    </GlobalContext.Provider>
}

export function useGlobal(){
    const global = useContext(GlobalContext);
    return global;
}