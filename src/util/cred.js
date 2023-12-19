
const cred = {};
{
    const hex = "0123456789ABCDEF";
    const method = {
        "none": {
            storage: "HEX_STRING",
            encoding: "ascii",
            data: "SHIFT_N32",
            encryption: "NONE"
        },
        "blot-non-char": {
            blots: [95, 0, 32, 95, 127, null]
        }
    }
    const defaultBlots = method["blot-non-char"]
    function validateString(s, blots=defaultBlots){
        for(let i=0; i<s.length; i++){
            let cc = s.charCodeAt(i);
            if(!validateCode(cc, blots)){
                return false;
            }
        }
        return true;
    }
    function validateCode(cc, blots=defaultBlots){
        for(let i=0; i<blots.length; i+=3){
            if((!blots[i+1] || blots[i+1] <= cc) && (!blots[i+2] || cc < blots[i+2])){
                return false;
            }
        }
        return true;
    }
    function blotCode(cc, blots=defaultBlots){
        for(let i=0; i<blots.length-2; i+=3){
            if((!blots[i+1] || blots[i+1] <= cc) && (!blots[i+2] || cc < blots[i+2])){
                return blots[i];
            }
        }
        return cc;
    }
    function toCodes(s){
        let codes = Array(s.length);
        for(let i=0; i<s.length; i++){
            let cc = s.charCodeAt(i);
            codes[i] = cc;
        }
        return codes;
    }
    function blotCodes(codes, blots=defaultBlots){
        for(let i=0; i<codes.length; i++){
            codes[i] = blotCode(codes[i], blots);
        }
        return codes;
    }
    function blotString(s, blots=defaultBlots){
        return String.fromCharCode(...blotCodes(toCodes(s), blots));
    }
    function toData(s, method="SHIFT_N32", blots=defaultBlots){
        let data = blotCodes(toCodes(s), blots);
        switch(method){
            case "SHIFT_N32":
                for(let i=0; i<data.length; i++){
                    data[i] = data[i] - 32;
                }
                return data;
            case "NONE":
                return data;
            default:
                return null;
        }
    }
    function toStorageData(data, method="HEX_STRING"){
        if(!data) return null;
        switch(method){
            case "HEX_STRING":
                let s = "";
                for(let d of data){
                    s += hex[d&15] + hex[(d>>4)&15];
                }
                return s;
            default:
                return null;
        }
    }
    function encrypt(data, method="NONE"){
        if(!data) return null;
        switch(method){
            case "NONE":
                return data;
            default:
                return null;
        }
    }
    function getCredData(s, {encrypt:encryptMethod="NONE", storage="HEX_STRING", data="SHIFT_N32"}={}){
        return toStorageData( encrypt( toData(s, data), encryptMethod), storage);
    }
    function getCredObj(s, options){
        let data = {
            encrypt: options.encrypt, 
            storage: options.storage, 
            data: options.data, 
            encode: ((options.encode === undefined) ? "ASCII" : options.encode), 
            cred: null
        };
        data.cred = getCredData(s, data);
        return data;
    }
    function randomCred(uniq="", options){
        return getCredData(uniq, options) + getCredData((Math.random().toPrecision(34)).slice(18), options);
    }
    cred.get = getCredObj;
    cred.blot = blotString;
    cred.validate = validateString;
    cred.random = randomCred;
    Object.freeze(cred);
}

export const credTool = cred;