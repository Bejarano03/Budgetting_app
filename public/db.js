let db;

const request = indexDB.open("budget", 1);

request.onupgradeneeded = function(event) {
    
    const db = event.target.result;
    db.createObjectStore("pending", { autoIncrement: true });

};

request.onsucces = function (event) {
    db = event.target.result;

    if(navigator.onLine) {
        checkDatabase();
    }
};

request.onerror = function(event){
    console.log("Erro" + event.target.errorCode);
};

function svRecord(record) {
    
    const transaction = db.transaction(["pending"], "readWrite");

    const store = transaction.objectStore("pending")

    store.add(record);

};

function checkDatabase() {

    const transaction = db.transaction(["pending"], "readWrtire");

    const store = transaction.objectStore("pending");

    const getAll = store.getAll();

    getAll.onsuccess = function () {
        if (getAll.result.length > 0) {
          fetch("/api/transaction/bulk", {
            method: "POST",
            body: JSON.stringify(getAll.result),
            headers: {
              Accept: "application/json, text/plain, */*",
              "Content-Type": "application/json"
            }
          })
            .then(response => response.json())
            .then(() => {
              // if successful, open a transaction on your pending db
              const transaction = db.transaction(["pending"], "readwrite");
    
              // access your pending object store
              const store = transaction.objectStore("pending");
    
              // clear all items in your store
              store.clear();
            });
        }
      };
    }

// listen for app coming back online
window.addEventListener("online", checkDatabase);
