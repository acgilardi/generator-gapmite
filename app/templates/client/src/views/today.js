var Backbone = require('backbone');//,
    //GoalsView = require('./goals'),
    //GoalsCollection = require('../collections/goals');

var TodayView = module.exports = Backbone.View.extend({
    template: require('../../templates/today.hbs'),
    initialize: function(){
        //this.goals = new GoalsCollection();
        this.render();
    },
    events: {
        'click #nav-add': 'onAdd',
        'click .splash-page': 'hideGuide'
    },
    render: function() {

        this.$el.html(this.template());
//
//
//        var self = this;
//        console.log('fetching...');
//        this.goals.fetch({
//            success: function(data) {
//                console.log('fetched');
//                var view =  new GoalsView({collection: data});
//                self.assign('#goals-view', view);
//            }
//        });

        // show guide on first visit
        if (app.models.preference.get('firstVisit') === true) {
            this.presentGuide();
            app.models.preference.set('firstVisit', false);
            app.models.preference.save({
                success: function(data) {
                    console.log('firstVisit preference saved');
                    //callback(null, data);
                },
                error: function(data) {
                    console.log('error');
                }
            });
        } else {
            this.hideGuide();
        }


//        return this;
    },
    presentGuide: function() {
        this.$('.splash-page').show();
    },
    hideGuide: function() {
        this.$('.splash-page').hide();
    },
    onAdd: function() {
        app.router.add();
    }
});
