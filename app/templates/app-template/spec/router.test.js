var Backbone = require('backbone'),
    Router = require('../src/router'),
    TodayView = require('../src/views/today'),
    AddView = require('../src/views/add');

describe('router class', function() {

    var router;

    beforeEach(function () {
        router = new Router();
        spyOn(router, 'showView').andCallThrough();
        spyOn(router, 'navigate');
    });
    it('is instantiable', function () {
        expect(router).toBeDefined();
    });
    it('inherits from Backbone Router', function () {
        expect(router instanceof Backbone.Router).toBeTruthy();
    });
    it('will route to the today view', function () {
        router.today();
        expect(router.showView)
            .toHaveBeenCalledWith(jasmine.any(TodayView));
        expect(router.navigate).toHaveBeenCalledWith('today');
    });
    it("will route to add view", function () {
        router.add();
        expect(router.showView).toHaveBeenCalledWith(jasmine.any(AddView));
        expect(router.navigate).toHaveBeenCalledWith('add');
    });
    it('will update the app with the current view', function () {
        router.today();
        expect(app.views.currentView instanceof TodayView).toBeTruthy();
    });
    it('will close the previous view', function () {
        var today = new TodayView();
        app.views.currentView = today;
        spyOn(today, 'close');
        router.today();
        expect(today.close).toHaveBeenCalled();
    });

});

