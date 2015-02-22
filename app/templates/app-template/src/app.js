var Jquery = require('jquery'),
    Backbone = require('backbone'),
    I18n = require('./services/i18n'),
    Router = require('./router'),
    async = require('async'),
    Preference = require('./models/preference'),
    DataService = require('./services/data'),
    Upgrade1 = require('./services/upgrade1');

    //Templates = require('./collections/templates');

require('./helpers');
Backbone.$ = Jquery;

window.App = module.exports = function(){};

window.App.prototype = {
    initialized: false,
    config: {},
    loc: {},
    views: {},
    models: {},
    collections: {},
    router: {},
    db: {},

    initialize: function(config) {
        this.bindEvents();
        this.config = config;
        this.loc = new I18n({
            directory: "locales",
            locale: this.config.language,
            extension: ".json"
        });

        this.router = new Router();

        var me = this;

        // add database upgrades
        var upgrades = [];
        upgrades.push(Upgrade1());

        //instantiate indexeddb
        var options = {
            name: this.config.dbName,
            version: this.config.dbVersion,
            forceNew: this.config.dbForceNew,
            upgrades: upgrades
        };
        DataService(options, function(error, db) {
            console.log('database loaded - forceNew:' + options.forceNew);
            me.db = db;
            me.config.dbForceNew = false;

            //load initial data
            async.series({
                preference: function(callback){
                    me.models.preference = new Preference();
                    me.models.preference.fetch({
                        success: function(data) {
                            callback(null, data);
                        }
                    });
                },
//                    two: function(callback){
//                        setTimeout(function(){
//                            callback(null, 2);
//                        }, 100);
//                    }
            },
            function(err, results) {
                // results is now equal to: {one: 1, two: 2}
                console.log('async fetch done');
                me.initialized = true;
                if(!Backbone.History.started) {
                    console.log('backbone history start');
                    Backbone.history.start();
                }
            });

//            //get preferences
//
//            // get templates
//            //me.collections.templates = new Templates();
//            //me.collections.templates.fetch({
//            //    success: function(data) {
//            //        console.log('templates fetched');
////            return true; if(!Backbone.History.started) {
////                            Backbone.history.start();
////                        }
////
//            //    }
//            //});
        });
    },

    /**
     * Bind event listeners. Bind any events that are required on startup.
     * common events are 'load', 'deviceready', 'offline' and 'online'
     */
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },


    /**
     * deviceready Event Handler
     * The scope of 'this' is the event. In order to call the 'receivedEvent'
     * function, we must explicity call 'app.receivedEvent(...);'
     */
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },


    /**
     * Update DOM on a received event
     * @param id element id that raised the event
     */
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};



