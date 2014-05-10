/* global app, require, jasmine, beforeEach, afterEach */

(function(){
    'use strict';

    require('jasmine-expect');

    var Backbone = require('backbone'),
        App = require('../src/app');

    config.dbName = 'appdb_test';
    config.dbForceNew = true;



    beforeEach(function() {
        if(Backbone.History.started) {
            Backbone.history.stop();
        }

        this.addMatchers({
            toBeA: function(expected) {
                return this.env.equals_(this.actual, jasmine.any(expected));
            }
        });

        this.helper = {
            trigger: function(obj, name) {
                var e = document.createEvent('Event');
                e.initEvent(name, true, true);
                obj.dispatchEvent(e);
            },
            getComputedStyle: function(querySelector, property) {
                var element = document.querySelector(querySelector);
                return window.getComputedStyle(element).getPropertyValue(property);
            }
        };
        Backbone.$('<div id="app" class="app"></div>').appendTo('body');

        // initialize the app. This is async so wait
        window.app = new App();
        config.dbForceNew = false;

        function initApp(){
            app.initialize();
        }
        runs(initApp);
        waitsFor(function(){
            return app.initialized;
        });
    });

    afterEach(function() {
        if(Backbone.History.started) {
            Backbone.history.stop();
        }
        Backbone.$('.app').remove();
    });

})();



