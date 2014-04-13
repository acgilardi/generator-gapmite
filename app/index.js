'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var cprocess = require('child_process');
var os = require('os');


var GapmiteGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = require('../package.json');

    this.on('end', function () {
      if (!this.options['skip-install']) {
          this.installDependencies({
              bower: false,
              callback: function () {

                  var child;
                  console.log('Running Grunt');
                  child = cprocess.spawn('grunt', ['cordovacli:cordova']);

                  child.stdout.setEncoding('utf8');
                  child.stdout.on('data', function (data) {
                      console.log(data);
                  });

                  child.stderr.setEncoding('utf8');
                  child.stderr.on('data', function (data) {
                      console.error(data);
                  });
              }
          });
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
        type: 'checkbox',
        name: 'platforms',
        message: 'Which platforms would you like to build for (platform dependencies must be installed first)?',
        choices: this.getPlatformChoices()
    }, {
        type: 'checkbox',
        name: 'plugins',
        message: 'What plugins would you like to add support for?',
        choices: this.getPluginsChoices()
    } , {
        name: 'appName',
        message: 'What is the package name for your app?',
        default: 'MyAppName'
    } , {
        name: 'appId',
        message: 'What is the unique app id (reverse domain notation)?',
        default: 'com.company.appname'
    }];

    this.prompt(prompts, function (props) {

     // build the platforms array used in the Gruntfile
     this.platforms = '[\'' + props.platforms.toString().split(',').join('\', \'') + '\']';

     // build the plugins array used in the Gruntfile
        if (this.plugins && this.plugins.length > 0) {
            this.plugins = '[\'' + props.plugins.toString().split(',').join('\', \'') + '\']';
        } else {
            this.plugins = '[]';
        }

      this.appName = props.appName;
      this.appId = props.appId;

      done();
    }.bind(this));
  },

  app: function () {
    //this.mkdir('flatui');
    //this.directory('flatui', 'flatui');
    //this.mkdir('www');
    //this.directory('www', 'client');

    this.copy('_package.json', 'package.json');
    this.copy('_bower.json', 'bower.json');
  },

  projectfiles: function () {
    this.copy('.bowerrc', '.bowerrc');
    this.copy('.gitignore', '.gitignore');
    this.copy('editorconfig', '.editorconfig');
    this.copy('jshintrc', '.jshintrc');
    this.copy('_Readme.md', 'Readme.md');
    this.template('Gruntfile.js', 'Gruntfile.js');
    this.copy('karma.conf.js', 'karma.conf.js');
  },

    getPlatformChoices: function () {
        var choices = [];

        choices.push({
            name: 'Android',
            value: 'android',
            checked: true
        });
        if (os.platform() === 'darwin') {
            choices.push({
                name: 'iOS',
                value: 'ios',
                checked: true
            });
        }
        choices.push({
            name: 'Blackberry 10',
            value: 'blackberry10',
            checked: false
        });
        if (os.platform() === 'win32') {
            choices.push({
                name: 'Windows Phone 8',
                value: 'wp8',
                checked: true
            });

            choices.push({
                name: 'Windows 8',
                value: 'windows8',
                checked: true
            });
        }
        choices.push({
            name: 'Firefox OS',
            value: 'firefoxos',
            checked: false
        });
        return choices;
    },

    getPluginsChoices: function () {
        var choices;

        choices = [{
            name: 'Device',
            value: 'device',
            checked: true
        },
        {
            name: 'Dialogs',
            value: 'dialogs',
            checked: false
        },
        {
            name: 'Battery Status',
            value: 'battery-status',
            checked: false
        },
        {
            name: 'Camera',
            value: 'camera',
            checked: false
        },
        {
            name: 'Console',
            value: 'console',
            checked: false
        },
        {
            name: 'Contacts',
            value: 'contacts',
            checked: false
        },
        {
            name: 'Device Motion',
            value: 'device-motion',
            checked: false
        },
        {
            name: 'Device Orientation',
            value: 'device-orientation',
            checked: false
        },
        {
            name: 'File',
            value: 'file-transfer',
            checked: false
        },
        {
            name: 'Geolocation',
            value: 'geolocation',
            checked: false
        },
        {
            name: 'Globalization',
            value: 'globalization',
            checked: false
        },
        {
            name: 'In App Browser',
            value: 'inappbrowser',
            checked: false
        },
        {
            name: 'Media',
            value: 'media',
            checked: false
        },
        {
            name: 'Media Capture',
            value: 'media-capture',
            checked: false
        },
        {
            name: 'Network Information',
            value: 'network-information',
            checked: false
        },
        {
            name: 'Splashscreen',
            value: 'splashscreen',
            checked: false
        },
        {
            name: 'Vibration',
            value: 'vibration',
            checked: false
        }];

        return choices;
    }
});

module.exports = GapmiteGenerator;