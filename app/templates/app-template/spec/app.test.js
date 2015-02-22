var Backbone = require('backbone'),
    _ = require('underscore'),
    I18n = require('../src/services/i18n'),
    TodayView = require('../src/views/today');

describe('app', function() {

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
        var openSuccess = undefined;

        beforeEach(function() {

            function openDb() {
                var request = window.indexedDB.open(app.config.dbName);
                request.onsuccess = function(e) {
                    openSuccess = true;
                    version = e.target.result.version;
                };
                request.onerror = function(e) {
                    openSuccess = false;
                }
            }

            runs(openDb);
            waitsFor(function() {
                return openSuccess !== undefined;
            });
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
                app.loc = new I18n({
                    directory: "locales",
                    locale: locale,
                    extension: ".json"
                });

                expect(app.loc.__('test-word-cat')).toEqual(data[locale]);
            };
        });

        it('can present text in english (' + data['en-us'] + ')', function () {
            testLocale('en-us');
        });
        it('can present text in Korean (' + data['ko'] + ')', function () {
            testLocale('ko');
        });
        it('can present text in Spanish (' + data['es'] + ')', function () {
            testLocale('es');
        });
        it('can present text in Russian (' + data['ru'] + ')', function () {
            testLocale('ru');
        });
        it('can present text in German (' + data['de'] + ')', function () {
            testLocale('de');
        });
        it('can present text in Japanese (' + data['ja'] + ')', function () {
            testLocale('ja');
        });
        it('can present text in French (' + data['fr'] + ')', function () {
            testLocale('fr');
        });
        it('can present text in Portuguese (' + data['pt'] + ')', function () {
            testLocale('pt');
        });
    });

    describe('handle global events', function () {
        var el;

        beforeEach(function() {
            el = document.getElementById('app');
            el.innerHTML = ['<div id="deviceready">',
                '    <p class="event listening">Listening</p>',
                '    <p class="event received">Received</p>',
                '</div>'].join('\n');
        });
        afterEach(function() {
            el.remove();
        });

        describe('initialize', function() {
            it('should bind deviceready', function() {
                runs(function() {
                    spyOn(app, 'onDeviceReady');
                    app.initialize(config);
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

//        var el;
//
//        beforeEach(function() {
//            el = document.getElementById('app');
//            el.innerHTML = ['<div id="deviceready">',
//                '    <p class="event listening">Listening</p>',
//                '    <p class="event received">Received</p>',
//                '</div>'].join('\n');
//        });
//        afterEach(function() {
//            el.remove();
//        });

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

});

