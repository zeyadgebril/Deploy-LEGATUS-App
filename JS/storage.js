const dbName = 'ecomDB'
export function initDB() {
    if (!localStorage.getItem(dbName)) {
        localStorage.setItem(dbName, JSON.stringify({users:[],
            products:[],
            orders:[]
        }));
    }
}

export function saveData(key,value){
    const dbData = JSON.parse(localStorage.getItem(dbName));
    dbData[key] = value;
    localStorage.setItem(dbName, JSON.stringify(dbData))
}
export function load(key) {
    const dbData = JSON.parse(localStorage.getItem(dbName));
    
    return dbData[key];
  }