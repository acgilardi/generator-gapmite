var Backbone = require('backbone'),
    TodayView = require('../../src/views/today'),
    AddView = require('../../src/views/add');

describe('TodayView', function() {

    var todayView;

    beforeEach(function() {
        app.router.today();
        todayView = app.views.currentView;
    });

    describe('add action selected', function () {
        it('will launch add view', function () {
            todayView.$('#nav-add').trigger('click');
            expect(app.views.currentView instanceof AddView).toBeTrue();
        });
    });

    describe('render', function () {

        beforeEach(function() {
            spyOn(todayView, 'presentGuide').andCallThrough();
            spyOn(todayView, 'hideGuide').andCallThrough();
            spyOn(app.db.preference, 'save');
            todayView.delegateEvents();
        });

        it('will show guide on first visit', function () {
            app.models.preference.set('firstVisit', true);
            todayView.render();
            expect(todayView.presentGuide).toHaveBeenCalled();
        });
        it('will not show guide on other visit', function () {
            app.models.preference.set('firstVisit', false);
            todayView.render();
            expect(todayView.hideGuide).toHaveBeenCalled();
        });
        it('will persist first visit is done', function () {
            app.models.preference.set('firstVisit', true);
            todayView.render();
            expect(app.models.preference.get('firstVisit')).toEqual(false);
            expect(app.db.preference.save).toHaveBeenCalled();
        });
        it('will hide guide when selected', function () {
            app.models.preference.set('firstVisit', true);
            todayView.render();
            todayView.$('.splash-page').trigger('click');
            expect(todayView.hideGuide).toHaveBeenCalled();
        });
    });

    describe('presentGuide', function () {
        it('should show guide image', function () {
            todayView.$('.splash-page').hide();
            todayView.presentGuide();
            var visible = this.helper.isVisible(todayView, '.splash-page');
            expect(visible).toEqual(true);
        });
    });

    describe('hideGuide', function () {
        it('should hide guide image', function () {
            todayView.$('.splash-page').show();
            todayView.hideGuide();
            var visible = this.helper.isVisible(todayView, '.splash-page');
            expect(visible).toEqual(false);
        });
    });
});
