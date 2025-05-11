// StorageManager.js
export class StorageManager {
  static save(key, data) {
    try {
      const jsonData = JSON.stringify(data);
      localStorage.setItem(key, jsonData);
      console.log(`Saved ${key}:`, data);
    } catch (e) {
      console.error(`Error saving ${key}:`, e);
    }
  }

  static load(key) {
    const data = localStorage.getItem(key);
    console.log(`Loaded ${key}:`, data ? "done" : "not found");

    if (data) {
      try {
        return JSON.parse(data);
      } catch (e) {
        console.error(`Error parsing ${key}:`, e);
        return null;
      }
    }
    return null;
  }
  
    static remove(key) {
      localStorage.removeItem(key);
      console.log(`Removed ${key}`);
    }
  
    static clearAll() {
      localStorage.clear();
      console.log("All data cleared from localStorage");
    }
  }