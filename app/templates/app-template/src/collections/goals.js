var jQuery = require('jquery'),
    Backbone = require('backbone'),
    Goal = require('../models/goal');
//
//Backbone.$ = jQuery;
//
var Goals = module.exports = Backbone.Collection.extend({
    model: Goal,
    sync: function(method, collection, options) {
        options = options || {};

        switch (method) {
            case 'create':
                break;

            case 'update':
                break;

            case 'delete':
                break;

            case 'read':
                this.find().done(function (data) {
                    options.success(data);
                });
                break;
        }
    },
    find: function () {
        var deferred = $.Deferred();

        app.db.goal.find(function(error, goals) {
            deferred.resolve(goals);
        });
        return deferred.promise();
    }
});


