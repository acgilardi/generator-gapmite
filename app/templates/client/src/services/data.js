var _ = require('underscore');

var DataService = module.exports = function (options, callback) {

    var verifyCollections = function (upgrade, callback) {

        var addCollections = function (upgrade) {

            var addRecords = function(store) {
                // Perform all adds for collections that we ar just creating now
                _.each(upgrade.saves[collection], function(record) {
                    store.add(record);
                }, store);
            };

            for (var i = 0; i < options.collections.length; i++) {
                var collection = options.collections[i];
                if (!db.objectStoreNames.contains(collection)) {
                    var store = db.createObjectStore(collection, {keyPath:"_id", autoIncrement:true});
                    addRecords(store);
                    delete upgrade.saves[collection];
                }
            }
        };

        var removeCollections = function () {
            for (var i = 0; i < db.objectStoreNames.length; i++) {
                var collection = db.objectStoreNames[i];
                if (options.collections.indexOf(collection) === -1) {
                    db.deleteObjectStore(collection);
                }
            }
        };

        addCollections(upgrade);
        removeCollections();

        if (typeof callback === "function") {
            callback(upgrade);
        }
    };

    var prepareBrowserDbInstance = function (upgrade, callback) {

        var browserDbInstance;

        var getCollectionApiInstance = function (collection) {
            var transaction, store;
            var findObjectsByQuery = function (transaction, store, query, onlyOne, callback) {
                var objectQueryTest = function (query, object) {
                    if (typeof query !== "object") return false;
                    else {
                        for (var clause in query) {
                            var definition = query[clause];
                            if (typeof definition !== "object") {
                                if (object[clause] instanceof Array && object[clause].indexOf(definition) === -1) return false;
                                else if (!(object[clause] instanceof Array) && object[clause] !== definition) return false;
                            } else {
                                for (var operator in definition) {
                                    var value = definition[operator];
                                    var operation;
                                    switch (operator) {
                                        case '$gt':
                                            operation = object[clause] > value;
                                            break;
                                        case '$gte':
                                            operation = object[clause] >= value;
                                            break;
                                        case '$lt':
                                            operation = object[clause] < value;
                                            break;
                                        case '$lte':
                                            operation = object[clause] <= value;
                                            break;
                                        case '$ne':
                                            operation = object[clause] !== value;
                                            break;
                                        case '$nin':
                                            operation = value instanceof Array && value.indexOf(object[clause]) === -1;
                                            break;
                                        case '$mod':
                                            operation = value instanceof Array && value.length === 2 && object[clause] % value[0] === value[1];
                                            break;
                                        case '$size':
                                            operation = object[clause] instanceof Array && object[clause].length === value;
                                            break;
                                        case '$exists':
                                            operation = Boolean(object[clause]) === value;
                                            break;
                                        case '$typeof':
                                            operation = typeof object[clause] === value;
                                            break;
                                        case '$nottypeof':
                                            operation = typeof object[clause] !== value;
                                            break;
                                    }
                                    if (!operation) return false;
                                }
                            }
                        }
                        return true;
                    }
                };
                var result = [];
                var openCursorRequest = store.openCursor();
                openCursorRequest.onerror = function (event) {
                    if (typeof callback === "function") callback(event);
                };
                openCursorRequest.onsuccess = function (event) {
                    var cursor = event.target.result;
                    if (cursor && cursor.key) {
                        var getRequest = store.get(cursor.key);
                        getRequest.onerror = function (event) {
                            if (typeof callback === "function") callback(event);
                        };
                        getRequest.onsuccess = function (event) {
                            if (!query) {
                                result.push(event.target.result);
                                if (onlyOne && result.length === 1) callback(undefined, result, event);
                            } else {
                                if (objectQueryTest(query, event.target.result)) result.push(event.target.result);
                            }
                            cursor.continue();
                        };
                    } else {
                        callback(undefined, result, event);
                    }
                };
            };
            return {
                save:function (object, callback) {
                    transaction = db.transaction([collection], "readwrite");
                    store = transaction.objectStore(collection);
                    var saveRequest = store.put(object);
                    saveRequest.onerror = function (event) {
                        if (typeof callback === "function") callback(event);
                    };
                    saveRequest.onsuccess = function (event) {
                        var getRequest = store.get(event.target.result);
                        getRequest.onerror = function (event) {
                            if (typeof callback === "function") callback(event);
                        };
                        getRequest.onsuccess = function (event) {
                            if (typeof callback === "function") callback(undefined, event.target.result, event);
                        };
                    };
                },
                remove:function () {
                    transaction = db.transaction([collection], "readwrite");
                    store = transaction.objectStore(collection);
                    var query = (typeof arguments[0] === "object") ? arguments[0] : undefined;
                    var callback = (typeof arguments[arguments.length - 1] === "function") ? arguments[arguments.length - 1] : undefined;
                    findObjectsByQuery(transaction, store, query, false, function (error, result, event) {
                        result.forEach(function (object) {
                            store.delete(object._id);
                        });
                        if (typeof callback === "function") callback(error, true, event);
                    });
                },
                find:function () {
                    var query = (typeof arguments[0] === "object") ? arguments[0] : undefined;
                    var callback = (typeof arguments[arguments.length - 1] === "function") ? arguments[arguments.length - 1] : undefined;
                    if (!callback) throw new Error("Callback required");
                    else {
                        transaction = db.transaction([collection], "readwrite");
                        store = transaction.objectStore(collection);
                        findObjectsByQuery(transaction, store, query, false, function (error, result, event) {
                            callback(error, result, event);
                        });
                    }
                },
                findOne:function () {
                    var query = (typeof arguments[0] === "object") ? arguments[0] : undefined;
                    var callback = (typeof arguments[arguments.length - 1] === "function") ? arguments[arguments.length - 1] : undefined;
                    if (!callback) throw new Error("Callback required");
                    else {
                        transaction = db.transaction([collection], "readwrite");
                        store = transaction.objectStore(collection);
                        findObjectsByQuery(transaction, store, query, false, function (error, result, event) {
                            callback(error, result[0], event);
                        });
                    }
                },
                findById:function (id, callback) {
                    transaction = db.transaction([collection], "readwrite");
                    store = transaction.objectStore(collection);
                    var getRequest = store.get(id);
                    getRequest.onerror = function (event) {
                        if (typeof callback === "function") callback(event);
                    };
                    getRequest.onsuccess = function (event) {
                        if (typeof callback === "function") callback(undefined, event.target.result, event);
                    };
                }
            };
        };

        browserDbInstance = {};

        upgrade.collections.forEach(function (collection) {
            browserDbInstance[collection] = getCollectionApiInstance(collection);
        });

        browserDbInstance.delete = function (callback) {
            var deleteRequest = window.indexedDB.deleteDatabase(options.db);
            deleteRequest.onError = function () {
                if (typeof callback === "function") {
                    callback(undefined, event);
                }
            };
            deleteRequest.onSuccess = function (event) {
                if (typeof callback === "function") {
                    callback(undefined, event);
                }
            };
        };

        if (typeof callback === "function") {
            callback(upgrade, browserDbInstance);
        }
    };

    window.indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.msIndexedDB;

    var me = this;
    var db;
    var openDbRequest;
    var openDatabase = function() {
        openDbRequest = window.indexedDB.open(options.name, options.version);
        openDbRequest.onerror = function (event) {
            console.log('browserdb: error');
        };

        openDbRequest.onsuccess = function (event) {
            db = event.target.result;
            prepareBrowserDbInstance(_.last(upgrades), callback);
        };

        openDbRequest.onupgradeneeded = function(event) {
            db = event.target.result;
            trans = event.target.transaction;

            var updateDb = function(upgrade, BrowserDb) {

                // handle saves and deletes for existing collections
                _.each(upgrade.saves, function(records, collectionName, list) {
                    if(db.objectStoreNames.contains(collectionName)) {
                        var collection = trans.objectStore(collectionName);
                        _.each(records, function(record, index) {
                            collection.add(record);
                        });
                    }
                }, trans);

                //TODO: Do all upddates here
                //TODO: Do all deletes here

               //callback(undefined, BrowserDb);
            };

            for (var ver = event.oldVersion + 1; ver <= event.newVersion; ver++) {
                for(var up = 0; up < upgrades.length; up++) {
                    var upgrade = options.upgrades[up];

                    if(upgrade.version === ver) {
                        options.collections = upgrade.collections;

                        // this will create collections and add any upgrade data to these new collections
                        verifyCollections(upgrade, updateDb
                            //prepareBrowserDbInstance(upgrade, updateDb)
                        );
                    }
                }
            }
        };
    };

    if(options.forceNew) {
        var reqDelete = window.indexedDB.deleteDatabase(options.name);
        reqDelete.onerror = function(event) {
            console.log('error deleting database');
        };
        reqDelete.onsuccess = function(event) {
            openDatabase();
        };
    } else {
        openDatabase();
    }
};
