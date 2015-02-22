var jQuery = require('jquery'),
    Backbone = require('backbone');
//
//Backbone.$ = jQuery;
//
var Today = module.exports = Backbone.Model.extend({
//
//    initialize: function () {
//        //this.reports = new ReportsCollection();
//        //this.reports.parent = this;
//    },
//
//    sync: function (method, model, options) {
//
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
//                this.findById(parseInt(this.id)).done(function (data) {
//                    options.success(data);
//                });
//                break;
//        }
//    },
//
//
//    findById: function (id) {
//        var deferred = $.Deferred();
//        app.db.goal.find({_id: id}, function(error, templates) {
//            deferred.resolve(templates[0]);
//        });
//        return deferred.promise();
//    }
});