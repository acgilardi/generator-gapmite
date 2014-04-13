var Backbone = require('backbone'),
    TodayView = require('../../src/views/today');

describe('TodayView', function() {

//    var todayView;
//
//    beforeEach(function() {
//        app.router.today();
//        todayView = app.views.currentView;
//        spyOn(todayView, 'presentGuide').andCallThrough();
//        app.models.preference.set('firstVisit', true);
//    });
//
//    story('As a new user, I can be guided on the today view the first time, So that I can lear how it works',
//        function () {
//
//
//            scenario(
//                'SCENARIO: Guide me',
//                'GIVEN: this is my first time launching the app',
//                function () {
//                    describe('WHEN: the today view is presented', function () {
//                        beforeEach(function() {
//                            todayView.render();
//                        });
//                        it('THEN: show a guide overlay', function () {
//                            expect(app.views.currentView instanceof TodayView).toBeTrue();
//                            expect(app.views.currentView.presentGuide).toHaveBeenCalled();
//                        });
//                    });
//                }
//            ); // end scenario
//
//            scenario(
//                'SCENARIO: Dont guide me',
//                'GIVEN: this is not my first time launching the app',
//                function() {
//                    describe('WHEN: the today view is presented', function () {
//                        beforeEach(function() {
//                            todayView.presentGuide.reset();
//                            todayView.render();
//                        });
//                        it('THEN: do not show the guide overlay', function () {
//                            expect(app.views.currentView instanceof TodayView).toBeTrue();
//                            expect(app.views.currentView.presentGuide).not.toHaveBeenCalled();
//                        });
//                    });
//                }
//            ); // scenario
//
//        }
//    ); // end story
});
