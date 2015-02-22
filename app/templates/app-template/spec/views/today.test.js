var Backbone = require('backbone'),
    TodayView = require('../../src/views/today'),
    AddView = require('../../src/views/add');
    TodayModel = require('../../src/models/today');

describe('TodayView', function() {

    var todayView;

    beforeEach(function() {
        app.router.today();
        todayView = app.views.currentView;
    });


    it('will contain a today model', function () {
        expect(todayView.model instanceof TodayModel).toBeTruthy();
    });

    describe('add action selected', function () {
        it('will launch add view', function () {
            todayView.$('#nav-add').trigger('click');
            expect(app.views.currentView instanceof AddView).toBeTrue();
        });
    });

    describe('render', function () {
        var activeDate = new Date(2014,1,1);

        beforeEach(function() {
            spyOn(todayView, 'presentGuide').andCallThrough();
            spyOn(todayView, 'hideGuide').andCallThrough();
            spyOn(todayView, 'fetchGoals');
            spyOn(app.db.preference, 'save');
            todayView.model.set('activeDate', activeDate);
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
        it('will fetch goals for the day', function () {
            todayView.render();
            expect(todayView.fetchGoals)
                .toHaveBeenCalledWith(activeDate);
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

    describe('goals', function () {
        it('should exist as a collection', function () {
            expect(todayView.goals).toBeDefined();
        });
    });

    describe('fetchGoals', function () {
        beforeEach(function() {
            spyOn(todayView, 'fetchGoals');
            todayView.fetchGoals();
        });

        it('should fetch goals from database', function () {
            expect(todayView.fetchGoals).toHaveBeenCalled();
        });
        it('should populate a goals view', function () {
            expect(todayView.goals.length).toBeGreaterThan(0);
        });
//        it('should populate goals for given date', function () {
//
//        });
//        it('should assign the goals view to the today view', function () {
//
//        });
    });
});
