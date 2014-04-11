var Backbone = require('backbone'),
    _ = require('underscore'),
    I18n = require('../src/services/i18n'),
    BrowserDb = require('../src/services/data'),
    TodayView = require('../src/views/today');

describe('lifeMite app', function() {

    it('is instantiable', function () {
        expect(app).toBeDefined();
    });
    it('should contain a router instance', function () {
        expect(app.router).toBeDefined();
    });
    it('should contain a i18n instance', function () {
        expect(app.loc instanceof I18n).toBeTruthy();
    });
    it('should contain a database instance', function () {
        expect(app.db).toBeTruthy();
    });
    it('should show the today view when it launches', function () {
        expect(app.views.currentView instanceof TodayView).toBeTrue();
    });

    describe('database', function () {

        var version;
        var collections;
        var openSuccess = false;

        beforeEach(function() {
            var request = window.indexedDB.open(app.config.dbName);
            request.onsuccess = function(e) {
                openSuccess = true;
            };
        });

        it('exist as an indexedDb', function () {
            expect(openSuccess).toBeTruthy();
        });
        it('should be verison 1', function () {
            expect(version).toEqual(1);
        });
    });

    describe('localization', function () {

        var data = {
            'en-us': 'cat',
            'ko': '고양이',
            'es': 'gato',
            'ru': 'кошка',
            'de': 'Katze',
            'ja': '猫',
            'fr': 'chat',
            'pt': 'gato'
        };
        var testLocale;

        beforeEach(function() {
            testLocale = function(locale) {
                app.config.language = locale;
                app.initialized = false;

                function initApp(){
                    app.initialize();
                }
                function test(){
                   expect(app.loc.__('test-word-cat')).toEqual(data[locale]);
                }

                runs(initApp);
                waitsFor(function(){
                    return app.initialized;
                });
                runs(test);
            };
        });
        it('can present text in english', function () {
            expect(app.loc.__('test-word-cat')).toEqual(data['en-us']);
        });
        it('can present text in Korean', function () {
            testLocale('ko');
        });
        it('can present text in Spanish', function () {
            testLocale('es');
        });
        it('can present text in Russian', function () {
            testLocale('ru');
        });
        it('can present text in German', function () {
            testLocale('de');
        });
        it('can present text in Japanese', function () {
            testLocale('ja');
        });
        it('can present text in French', function () {
            testLocale('fr');
        });
        it('can present text in Portuguese', function () {
            testLocale('pt');
        });
    });

    describe('initialize', function() {
        it('should bind deviceready', function() {
            runs(function() {
                spyOn(app, 'onDeviceReady');
                app.initialize();
                this.helper.trigger(window.document, 'deviceready');
            });

            waitsFor(function() {
                return (app.onDeviceReady.calls.length > 0);
            }, 'onDeviceReady should be called once', 500);

            runs(function() {
                expect(app.onDeviceReady).toHaveBeenCalled();
            });
        });
    });

    describe('onDeviceReady', function() {
        it('should report that it fired', function() {
            spyOn(app, 'receivedEvent');
            app.onDeviceReady();
            expect(app.receivedEvent).toHaveBeenCalledWith('deviceready');
        });
    });

    describe('receivedEvent', function() {
        beforeEach(function() {
            var el = document.getElementById('lifemite-app');
            el.innerHTML = ['<div id="deviceready">',
                '    <p class="event listening">Listening</p>',
                '    <p class="event received">Received</p>',
                '</div>'].join('\n');
        });

        it('should hide the listening element', function() {
            app.receivedEvent('deviceready');
            var displayStyle = this.helper.getComputedStyle('#deviceready .listening', 'display');
            expect(displayStyle).toEqual('none');
        });

        it('should show the received element', function() {
            app.receivedEvent('deviceready');
            var displayStyle = this.helper.getComputedStyle('#deviceready .received', 'display');
            expect(displayStyle).toEqual('block');
        });
    });
});

