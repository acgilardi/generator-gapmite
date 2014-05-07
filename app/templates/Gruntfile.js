/*global module:false*/
module.exports = function (grunt) {

    //TODO: change config to contain all locations and update grunt accordingly

    require('time-grunt')(grunt);
    //require('load-grunt-tasks')(grunt,{ pattern: ['grunt-*', '!grunt-cli']} );

    // configurable paths
    var yeomanConfig = {
        app: 'app',
        build: 'build',
        dist: 'dist'
    };

    // Project configuration.
    grunt.initConfig({
        yeoman: yeomanConfig,
        pkg: grunt.file.readJSON('package.json'),

        bower: {
            install: {
                options: {
                    targetDir: 'client/vendor',
                    layout: 'byComponent'
                }
            }
        },

        clean: {
            build: ['build', 'app/www'],
            dev: {
                src: ['build/app.js']
            }
        },

        browserify: {
            vendor: {
                src: ['client/vendor/**/*.js'],
                dest: 'build/vendor.js',
                options: {
                    alias: [
                        'client/vendor/jquery/js/jquery.js:jquery',
                        'client/vendor/backbone/js/backbone.js:backbone',
                        'client/vendor/underscore/js/underscore.js:underscore',
                        'client/vendor/sprintf/js/sprintf.js:sprintf',
                        'client/vendor/async/js/async.js:async'
                    ]
                }
            },
            flatui: {
                src: ['client/flatui/**/*.js'],
                dest: 'build/flatui.js'
            },
            app: {
                files: {
                    'build/client.js': ['client/src/**/*.js']
                },
                options: {
                    transform: ['hbsfy'],
                    external: ['jquery', 'underscore', 'backbone', 'sprintf', 'async']
                }
            },
            test: {
                files: {
                    'build/spec.js':['client/spec/spec_helper.js','client/spec/**/*.test.js']
                },
                options: {
                    transform: ['hbsfy'],
                    external: ['jquery', 'underscore', 'backbone', 'sprintf', 'async']
                }
            }
        },

        concat: {
            'build/app.js': ['build/vendor.js','build/flatui.js', 'build/client.js'],
            'build/app.css': [
                'client/vendor/*/css/*',
                'client/css/**/*.css',
                'client/less/**/*.less'
            ]
        },

        copy: {
            initial: {
                files: [
                    {
                        src: 'client/SpecRunner.html',
                        dest: 'build/SpecRunner.html'
                    }, {
                        src: 'client/index.html',
                        dest: 'app/www/index.html'
                    }, {
                        expand: true,
                        flatten: true,
                        src: 'client/img/*',
                        dest: 'app/www/images/'
                    }, {
                        expand: true,
                        flatten: true,
                        src: 'flatui/css/**/*.css',
                        dest: 'app/www/css/'
                    }, {
                        expand: true,
                        flatten: true,
                        src: 'flatui/js/**/*.js',
                        dest: 'app/www/js/'
                    }, {
                        expand: true,
                        cwd: 'flatui/',
                        src: '**',
                        dest: 'app/www/',
                        flatten: false,
                        filter: 'isFile'
                    }, {
                        expand: true,
                        flatten: true,
                        src: 'client/locales/*',
                        dest: 'build/locales'
                    }, {
                        expand: true,
                        flatten: true,
                        src: 'client/locales/*',
                        dest: 'app/www/locales'
                    }
                ]
            },
            dev: {
                files: [
                    {
                        src: 'build/app.js',
                        dest: 'app/www/js/app.js'
                    }, {
                        src: 'build/app.css',
                        dest: 'app/www/css/app.css'
                    }
                ]
            }
        },

        uglify: {
            dist: {
                src: ['app/www/js/app.js'],
                dest: 'app/www/js/app.min.js'
            }
        },

        jshint: {
            files: ['Gruntfile.js', 'client/src/**/*.js'],
            options: {
                curly: true,
                eqeqeq: true,
                immed: true,
                latedef: true,
                newcap: true,
                noarg: true,
                sub: true,
                undef: true,
                boss: true,
                devel: true,
                eqnull: true,
                browser: true,
                globals: {
                    cordova: true
                }
            }
        },

        watch: {
            files: [
                ['client/src/**/*.js', 'client/spec/**/*.js', 'client/templates/**/*.hbs']
            ],
            tasks: ['build:dev'],
            karma: {
                files: ['client/src/**/*.js', 'client/spec/**/*.js'],
                tasks: ['karma:unit:run']
            }
        },

        karma: {
            unit: {
                configFile: './karma.conf.js',
                background: false,
                autoWatch: true
            }
        },

        cordovacli: {
            options: {
                path: '<%%= yeoman.app %>'
            },
            cordova: {
                options: {
                    command: ['create', 'platform', 'plugin'],
                    platforms: <%= platforms %>,
                    plugins:  <%= plugins %>,
                    id: '<%= appId %>',
                    name: '<%= _.slugify(appName) %>'
                }
            },
            build: {
                options: {
                    command: 'build'
                }
            },
            emulate: {
                options: {
                command: 'emulate'
                }
            },
            run: {
                options: {
                command: 'run'
                }
            },
            prepare: {
                options: {
                command: 'prepare'
                }
            },
            compile: {
                options: {
                command: 'compile'
                }
            }
         },
    });

    // Load tasks
    grunt.loadNpmTasks('grunt-cordovacli');
    grunt.loadNpmTasks('grunt-browserify');
    //grunt.loadNpmTasks('grunt-bower');
    //grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-contrib-handlebars');
    grunt.loadNpmTasks('hbsfy');

    //grunt.loadNpmTasks('grunt-contrib-less');


    grunt.registerTask('load-bower', [], function () {
        grunt.loadNpmTasks('grunt-bower');
        grunt.loadNpmTasks('grunt-bower-task');
        grunt.task.run('bower');
    });


    // Custom tasks
    grunt.registerTask('init:dev', ['clean', 'load-bower', 'browserify:vendor', 'browserify:flatui', 'copy:initial']);
    grunt.registerTask('build:dev', ['clean:dev', 'browserify:app', 'browserify:test', 'concat', 'copy:dev']);
    grunt.registerTask('server:emulate', ['build:dev', 'emulate', 'watch']);
    grunt.registerTask('server', ['build:dev', 'watch']);

    // Cordova build commands
    grunt.registerTask('default', ['build']);
    grunt.registerTask('lint',    ['jshint']);
    //grunt.registerTask('server',  ['build', 'emulate', 'watch:cordova']);

    grunt.task.registerTask('build', 'Builds a Cordova App', function () {
        var check;

        //check = (yeomanConfig.app + '/.cordova/config.json');
        check = (yeomanConfig.app + '/config.xml');

        if (grunt.file.exists(check)) {
            grunt.log.writeln(check + ' exists, only do build');
            grunt.task.run(['init:dev', 'build:dev', 'cordovacli:build']);
        } else {
            grunt.log.writeln(check + ' does not exists, creating app and building');
            grunt.task.run(['cordovacli:cordova', 'init:dev', 'build:dev', 'cordovacli:build']);
        }
    });

    grunt.registerTask('prepare', ['cordovacli:prepare']);
    grunt.registerTask('compile', ['cordovacli:compile']);
    grunt.registerTask('emulate', ['cordovacli:emulate']);
    grunt.registerTask('run',     ['cordovacli:run']);
    //grunt.registerTask('demo',    ['build', 'emulate']);
};
