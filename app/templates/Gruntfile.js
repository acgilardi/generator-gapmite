/*global module:false*/
module.exports = function (grunt) {
    require('time-grunt')(grunt);

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        clean: {
            dev: ['dist/www/*'],
            app: ['dist']
        },

        copy: {
            app: {
                src: ['app/config.xml'],
                dest: 'dist/config.xml'
            },
            dev: {
                files: [
                    {
                        src: ['**/*', '!styles/**'],
                        expand: true,
                        cwd: 'app',
                        dest: 'dist/www'
                    },
                    {
                        src: ['*.*'],
                        expand: true,
                        cwd: 'app/vendor/components-font-awesome/fonts',
                        dest: 'dist/www/fonts'
                    }
                ]

            }
        },

        cordovacli: {
            options: {
                path: 'dist'
            },
            create: {

                options: {
                    command: ['create', 'platform', 'plugin'],
                    platforms: <%= platforms %>,
                    plugins:  <%= plugins %>,
                    id: '<%= appId %>',
                    name: '<%= _.slugify(appName) %>'
                }
            },
            emulate_ipad: {
                options: {
                    command: 'emulate',
                    platforms: ['ios']
                    //args: ['--target="iPad-2"','']
                }
            },
            run_ipad: {
                options: {
                    command: 'run',
                    platforms: ['ios']
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

        connect: {
            server: {
                options: {
                    port: 8000,
                    base: 'dist/www',
                    keepalive: true
                }
            }
        },

        shell: {
            open: {
                command: 'open "/Applications/Google\ Chrome.app" ' +
                '-n --args --enable-file-cookies  --disable-web-security -allow-file-access-from-files ' +
                'http://localhost:8000'
            }
        },

        watch: {
            dev: {
                files: ['app/**/*.*'],
                tasks: ['build']
            },
            options: {
                livereload: true
            }
        },

        compass: {
            dev: {
                options: {
                    sassDir: 'app/styles',
                    cssDir: 'dist/www/styles',
                    imagesPath: 'app/images',
                    noLineComments: false,
                    outputStyle: 'compressed'
                }
            }
        },

        bower: {
            install: {
                options: {
                    targetDir: 'app/vendor',
                    layout: 'byComponent'
                }
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

    // load grunt tasks (we dont use load-grunt-tasks) because that
    // requires all tasks be loaded. we require conditional loading
    // to speed grunt processes
    grunt.loadNpmTasks('grunt-cordovacli');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks('grunt-karma');


    grunt.task.registerTask('create', 'Builds a Cordova App', function () {
        if (grunt.file.exists('dist')) {
            grunt.log.writeln('App already exists. Must run "grunt cleanapp"');
        } else {
            grunt.log.writeln('app does not exists, creating cordova app');
            grunt.task.run(['cordovacli:create', 'copy:app']);
        }
    });

    grunt.registerTask('createapp', ['create:app', 'serve:initial']);
    grunt.registerTask('cleanapp', ['clean:app']);
    grunt.registerTask('build', ['clean:dev', 'copy:dev', 'compass:dev']);
    grunt.registerTask('serve', ['build', 'watch']);
    grunt.registerTask('serve:initial', ['clean:dev', 'bower', 'copy:dev', 'compass:dev', 'shell:open', 'connect']);
    grunt.registerTask('ios', ['cordovacli:run_ipad'])
};
