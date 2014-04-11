'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');


var GapmiteGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = require('../package.json');

    this.on('end', function () {
      if (!this.options['skip-install']) {
        this.installDependencies();
      }
    });
  },

  askFor: function () {
    var done = this.async();

    // have Yeoman greet the user
    this.log(this.yeoman);

    // replace it with a short and sweet description of your generator
    this.log(chalk.magenta('Gapmite generator will create a base project including ' +
        'Backbone.js, PhoneGap (Cordova), Browserify, FlatUI with TDD'));

    var prompts = [{
        name: 'authorName',
        message: 'What is the company name or author name producing this app?'
    }, {
        name: 'authorEmail',
        message: 'What is the email address of the company or author of this app?'
    }, {
        name: 'appName',
        message: 'What is the project name (no spaces)?'
    }, {
        name: 'appId',
        message: 'What is the app id (unique id for each app)?',
        default: 'com.company.app'
    }, {
        name: 'appVersion',
        message: 'What version of the app would you like to start with?',
        default: '1.0.0'
    }];



//      * authorName - What is the company producing or author name for the app.
//          * authorEmail - What is the company producing or authors email.
//          * appName - What is the name of your app?
//          * appId - What is the id of your app (ex. com.company.appname)
//      * appVersion - What version are you starting with (ex. 1.0.0)


      this.prompt(prompts, function (props) {
      this.authorName = props.authorName;
      this.authorEmail = props.authorEmail;
      this.appName = props.appName;
      this.appId = props.appId;
      this.appVersion = props.appVersion + '';

      done();
    }.bind(this));
  },

  app: function () {
    this.mkdir('app');
    this.mkdir('app/templates');

    this.mkdir('flatui');
    this.directory('flatui', 'flatui');
    this.mkdir('client');
    this.directory('client', 'client');

    this.template('_package.json', 'package.json');
    this.template('_bower.json', 'bower.json');
    this.template('_config.xml', 'config.xml');
    this.template('_manifest.webapp', 'manifest.webapp');
    this.template('_Readme.md', 'Readme.md');
  },

  projectfiles: function () {
    this.copy('editorconfig', '.editorconfig');
    this.copy('jshintrc', '.jshintrc');
  }
});

module.exports = GapmiteGenerator;