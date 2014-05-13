var jQuery = require('jquery'),
    Backbone = require('backbone');

Backbone.$ = jQuery;

var Preference = module.exports = Backbone.Model.extend({
    idAttribute: '_id',
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
                this.save();
                break;

            case 'delete':
                break;

            case 'read':
                this.findOne().done(function (data) {
                    options.success(data);
                });
                break;
        }
    },
    findOne: function () {
        var deferred = $.Deferred();
        app.db.preference.findOne(function(error, preference) {
            deferred.resolve(preference);
        });
        return deferred.promise();
    },
    save: function() {
        app.db.preference.save(this.toJSON());
    }
});
