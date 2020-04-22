export default class DataStorage {
    static getItem(itemName, isPermanent = true) {
        if(isPermanent === true)
            return localStorage.getItem(itemName);
        else
            return sessionStorage.getItem(itemName);
    }

    static setItem(itemName, value, isPermanent = true) {
        if(isPermanent === true)
            return localStorage.setItem(itemName, value);
        else
            return sessionStorage.setItem(itemName, value);
    }
    
    static removeItem(itemName, isPermanent = true) {
        if(isPermanent === true)
            return localStorage.removeItem(itemName);
        else
            return sessionStorage.removeItem(itemName);
    }

    static clear(isPermanent = true) {
        if(isPermanent === true)
            return localStorage.clear();
        else
            return sessionStorage.clear();
    }
}