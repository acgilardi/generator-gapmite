var jQuery = require('jquery'),
    Backbone = require('backbone');

Backbone.$ = jQuery;

var Preference = module.exports = Backbone.Model.extend({
    defaults: {
        firstVisit: true,
        locale: 'en-US'
    },
    initialize: function() {
    },
    sync: function (method, model, options) {

        options = options || {};

        switch (method) {
            case 'create':
                break;

            case 'update':
                break;

            case 'delete':
                break;

            case 'read':
                this.findAll().done(function (data) {
                    options.success(data);
                });
                break;
        }
    },
    findAll: function () {
        var deferred = $.Deferred();
        app.db.preference.find(function(error, preference) {
            deferred.resolve(preference);
        });
        return deferred.promise();
    }
});
