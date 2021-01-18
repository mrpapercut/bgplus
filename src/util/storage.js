const storageHandler = chrome.storage.local; // chrome.storage.sync

export const setStorage = (key, value) => {
    return new Promise((resolve, reject) => {
        storageHandler.set({
            [key]: typeof value === 'object' ? JSON.stringify(value) : value
        }, () => {
            if (chrome.runtime.lastError) {
                reject(chrome.runtime.lastError);
            } else {
                resolve();
            }
        });
    });
};

export const getStorage = (key = null) => {
    return new Promise((resolve, reject) => {
        storageHandler.get(key, result => {
            if (chrome.runtime.lastError) {
                reject(chrome.runtime.lastError);
            } else {
                if (key !== null) {
                    const resObj = result.hasOwnProperty(key) ? JSON.parse(result[key]) : [];
                    resolve(resObj);
                } else {
                    resolve(result);
                }
            }
        });
    });
}
