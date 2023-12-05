
class StorageFile {
    constructor(path, name, root){
        this.root = root;
        this.path = path;
        this.name = name;
    }
    get(path){
        return this.root.get(this, path);
    }
    getPath(){
        return this.root.getPath(this);
    }
    getFilePath(){
        return this.root.getFilePath(this);
    }
    getFullPath(){
        return this.root.getFullPath(this);
    }
    getFullFilePath(){
        return this.root.getFullFilePath(this);
    }
    save(data){
        return this.root.save(this, this.root.toStorageData(data));
    }
    load(){
        return this.root.toData(this.root.load(this));
    }
    delete(){
        return this.root.delete(this);
    }
    extendDomain(){
        return this.root.extendDomain(this).getBase();
    }
    isFolder(){
        return this.root.isFolder(this.name);
    }
}
class StorageInterfaceRoot {
    constructor(domain){
        if(!domain){
            domain = "/";
        } else if(domain[domain.length-1] !== "/") domain = domain + "/";
        this.domain = domain;
    }
    get(folder, path){
        if(folder){
            path = this.absPath([...folder.path, ...this.seperatePath(path)]);
        } else {
            path = this.absPath([...this.seperate(path)]);
        }
        let name = path[path.length-1] || "";
        path.pop();
        let file = new StorageFile(path, name, this);
        return file;
    }
    getBase(){
        return new StorageFile([], "", this);
    }
    extendDomain(file){
        return new this.constructor(this.getFullPath(file));
    }
    seperatePath(path){
        return path.split('/');
    }
    joinPath(path){
        return path.join("/");
    }
    getPath(file){
        return this.joinPath(file.path) + "/";
    }
    getFilePath(file){
        return this.getPath(file) + file.name;
    }
    getFullPath(file){
        let path = this.getPath(file);
        if(path === "/") return this.domain;
        return this.domain + path;
    }
    getFullFilePath(file){
        return this.getFullPath(file) + file.name;
    }
    isFolder(name){
        return !name;
    }
    absPath(path){
        for(let i in path){
            if(path[i] === '.'){
                path[i] = false;
            } else if(path[i] === '..'){
                path[i] = false;
                let j = i;
                while(j>0){
                    j--;
                    if(path[j]){
                        path[j] = false;
                        break;
                    }
                }
            }
        }
        let isFolder = (!path[path.length-1]);
        
        path = path.filter((name)=>!this.isFolder(name)); // new object
        if(isFolder){
            path.push("");
        }
        return path; // new object
    }
    toStorageData(data){
        return data;
    }
    toData(data){
        return data;
    }
    save(file, data){
        return false;
    }
    load(file){
        return null;
    }
    delete(file){
        return false;
    }
    hasAccess(file){
        return true;
    }
}

class LocalStorageInterfaceRoot extends StorageInterfaceRoot {
    save(file, data){
        let name = this.getFullFilePath(file);
        return localStorage.setItem(name, data);
    }
    load(file){
        let name = this.getFullFilePath(file);
        return localStorage.getItem(name);
    }
    delete(file){
        let name = this.getFullFilePath(file);
        return localStorage.removeItem(name);
    }
    toStorageData(data){
        try {
            return JSON.stringify(data);
        } catch {
            return null;
        }
    }
    toData(data){
        try {
            return JSON.parse(data);
        } catch {
            return null;
        }
    }
}

const credStorage = new LocalStorageInterfaceRoot("budget-app/cred-data").getBase();

function verifyName(name){
    if(name){
        if(name[name.length] !== "/"){
            return name + "/";
        }
        return name;
    }
    return "";
}

function getCredStorage(name, cred){
    name = verifyName(name);
    let file = credStorage.get(name);
    let credFile = file.get("cred");
    let storageCred = credFile.load();

    if(storageCred !== "" && storageCred !== null && storageCred !== cred) return null;

    if(storageCred === null) return undefined;
    
    return file.extendDomain().get("data");
}

function createCredStorage(name, cred){
    name = verifyName(name);
    let file = credStorage.get(name);
    let credFile = file.get("cred");
    let storageCred = credFile.load();
    if(storageCred || storageCred === "") return false;
    credFile.save(cred);
    file.extendDomain().get("data").save("");
    return true;
}

function deleteCredStorage(name){
    name = verifyName(name);
    let file = credStorage.get(name);
    let credFile = file.get("cred");
    credFile.delete();
    file.extendDomain().get("data").delete();
}

function hasStorage(name){
    name = verifyName(name);
    let file = credStorage.get(name);
    let credFile = file.get("cred");
    let hasData = (credFile.load() !== null);
    return hasData;
}

const storage = {
    cred: {
        get: getCredStorage,
        create: createCredStorage,
        has: hasStorage
    }
};

Object.freeze(storage);
Object.freeze(storage.cred);

export default storage;