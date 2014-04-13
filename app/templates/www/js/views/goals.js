//var Backbone = require('backbone'),
//    _ = require('underscore'),
//   GoalTimedView = require('./goal_views/timed'),
//   GoalDistanceView = require('./goal_views/distance');
//
//var GoalsView = module.exports = Backbone.View.extend({
//    template: require('../../templates/goals.hbs'),
//    initialize: function(){
//        this.goals = this.collection;
//       // this.goalViews = [];
//        this.render();
//    },
//    render: function() {
//        this.$el.html(this.template());
//
//        var self = this;
//        this.goals.each(function(goal, index, goals) {
//
//            var template = app.collections.templates.where({_id: goal.get('template_id')})[0];
//            var subView;
//
//            switch (template.get('type')) {
//                case 'timed':
//                    console.log('timedView');
//                    subView = new GoalTimedView({model: goal});
//                    break;
//
//                case 'distance':
//                    console.log('distanceView');
//                    subView = new GoalDistanceView({model: goal});
//                    break;
//            }
//
//            self.$el.append(subView.render().el);
//        }, self);
//
//        return this;
//    }
//});