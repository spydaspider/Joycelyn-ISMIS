export default class Store{
    static getLocalStorage = storageKey =>{
        let localData = [];
        if(localStorage.getItem(storageKey) === null)
        {
            localData = []
        }
        else
        {
            localData = JSON.parse(localStorage.getItem(storageKey));
        }
        return localData;

    }
    static addLocalStorage = (storageKey,data) =>{
        localStorage.setItem(storageKey,JSON.stringify(data));

    }
}