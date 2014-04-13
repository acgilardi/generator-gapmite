/*global module:false*/
module.exports = function (grunt) {

    require('time-grunt')(grunt);
    //require('load-grunt-tasks')(grunt,{ pattern: ['grunt-*', '!grunt-cli']} );

    // configurable paths
    var yeomanConfig = {
        app: 'app',
        dist: 'dist'
    };

    // Project configuration.
    grunt.initConfig({
        yeoman: yeomanConfig,
        pkg: grunt.file.readJSON('package.json'),

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

        bower: {
            install: {
                options: {
                    targetDir: 'client/vendor',
                    layout: 'byComponent'
                }
            }
        },

        clean: {
            build: ['build'],
            dev: {
                src: ['build/app.js']
            },
            test: {
                src: ['build/app.js','build/spec.js']
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
                    'build/app.js': ['client/src/**/*.js']
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
            'build/<%= pkg.name %>.js': ['build/vendor.js','build/flatui.js', 'build/app.js'],
            'build/<%= pkg.name %>.css': [
                'client/vendor/*/css/*',
                'client/css/**/*.css',
                'client/less/**/*.less'
            ]
        },

        copy: {
            initial: {
                files: [
                    {
                        src: './SpecRunner.html',
                        dest: 'build/SpecRunner.html'
                    }, {
                        expand: true,
                        flatten: true,
                        src: 'client/locales/*',
                        dest: 'build/locales/'
                    },{
                        expand: true,
                        flatten: true,
                        src: 'client/img/*',
                        dest: 'www/images/'
                    }, {
                        expand: true,
                        flatten: true,
                        src: 'client/cordova/*',
                        dest: 'www/'
                    },{
                        expand: true,
                        flatten: true,
                        src: 'flatui/css/**/*.css',
                        dest: 'www/css/'
                    }, {
                        expand: true,
                        flatten: true,
                        src: 'flatui/js/**/*.js',
                        dest: 'www/js/'
                    }, {
                        expand: true,
                        cwd: 'flatui/',
                        src: '**',
                        dest: 'www/',
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
                        dest: 'www/locales'
                    }
                ]
            },
            dev: {
                files: [
                    {
                        src: 'build/<%= pkg.name %>.js',
                        dest: 'www/js/<%= pkg.name %>.js'
                    }, {
                        src: 'build/<%= pkg.name %>.css',
                        dest: 'www/css/<%= pkg.name %>.css'
                    }
                ]
            }
        },

        uglify: {
            dist: {
                src: ['www/js/<%= pkg.name %>.js'],
                dest: 'www/js/<%= pkg.name %>.min.js'
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
        }
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

    grunt.registerTask('build:prod', ['clean:dev', 'browserify:app', 'browserify:test', 'concat', 'copy:dev', 'uglify']);

    grunt.registerTask('build:dev', ['clean:dev', 'browserify:app', 'browserify:test', 'concat', 'copy:dev']);

   // grunt.registerTask('build', ['clean:dev', 'browserify:app', 'browserify:test', 'less:transpile', 'concat', 'copy:dev', 'uglify']);
    //grunt.registerTask('build:test', ['browserify:app', 'browserify:test']);

    //grunt.registerTask('tdd', ['karma:unit','watch']);

    grunt.registerTask('server', ['build:dev', 'watch']);


    









    grunt.registerTask('default', ['build']);
    grunt.registerTask('lint',    ['jshint']);
    grunt.registerTask('server',  ['build', 'emulate', 'watch:cordova']);




    grunt.task.registerTask('build', 'Builds a Cordova App', function () {
        var check;

        check = (yeomanConfig.app + '/.cordova/config.json');

        if (grunt.file.exists(check)) {
            grunt.log.writeln(check + ' exists, only do build');
            grunt.task.run(['cordovacli:build']);
        } else {
            grunt.log.writeln(check + ' does not exists, creating app and building');
            grunt.task.run(['cordovacli:cordova', 'cordovacli:build']);
        }

    });

    grunt.registerTask('prepare', ['cordovacli:prepare']);
    grunt.registerTask('compile', ['cordovacli:compile']);
    grunt.registerTask('emulate', ['cordovacli:emulate']);
    grunt.registerTask('run',     ['cordovacli:run']);
    grunt.registerTask('demo',    ['build', 'emulate']);
};
