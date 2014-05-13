/* global app, require, jasmine, beforeEach, afterEach */

(function(){
    'use strict';

    require('./config');
    require('jasmine-expect');

    var Backbone = require('backbone'),
        App = require('../src/app');

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
            },
            isVisible: function(view, jqueryKey) {
                if (view.$(jqueryKey).first().css('display') === undefined) {
                    return false;
                } else {
                    return view.$(jqueryKey).first()
                        .css('display') !== 'none'
                }
            }
        };
        Backbone.$('<div id="app" class="app"></div>').appendTo('body');

        // initialize the app. This is async so wait
        window.app = new App();

        function initApp() {
            app.initialize(config);
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



