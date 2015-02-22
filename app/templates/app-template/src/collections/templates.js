//var jQuery = require('jquery'),
//    Backbone = require('backbone'),
//    Template = require('../models/template');
//
//Backbone.$ = jQuery;
//
//var Templates = module.exports = Backbone.Collection.extend({
//    model: Template,
//    sync: function(method, collection, options) {
//        options = options || {};
//
//        switch (method) {
//            case 'create':
//                break;
//
//            case 'update':
//                break;
//
//            case 'delete':
//                break;
//
//            case 'read':
//                this.find().done(function (data) {
//                    options.success(data);
//                });
//                break;
//        }
//    },
//    find: function () {
//        var deferred = $.Deferred();
//
//        app.db.template.find(function(error, templates) {
//            deferred.resolve(templates);
//        });
//        return deferred.promise();
//    }
//});


