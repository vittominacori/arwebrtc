module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({

        // CONCAT
        // ------
        concat: {
            // OPTIONS
            options: {
                separator: "\n\n/**********************************************************/\n\n"
            },
            plugins: {
                src: [
                    'bower_components/angular/angular.min.js',
                    'app/js/vendor/ccv.js',
                    'app/js/vendor/face.js',
                    'app/js/vendor/cookiechoices.js'
                ],
                dest: 'app/js/plugins.js'
            },
            // FRONTEND
            frontend: {
                src: [
                    'app/js/app.js',
                    'app/js/controllers.js'
                ],
                dest: 'app/js/frontend.js'
            },
            app: {
                src: [
                    'app/js/plugins.js',
                    'app/js/frontend.js'
                ],
                dest: 'app/js/script.js'
            }
        },

        // JSHINT
        // ------
        jshint: {

            // ALL
            all: [
                'app/js/app.js',
                'app/js/controllers.js'
            ]
        },

        // UGLIFY
        // ------
        uglify: {

            // OPTIONS
            options: {
                mangle: false
            },
            js: {
                files: {
                    'app/js/script.min.js': 'app/js/script.js'
                }
            }
        },

        // LESS
        // ----
        less: {
            production: {
                options: {
                    cleancss: true
                },
                files: {
                    "app/css/style.css": "app/less/style.less"
                }
            }
        },

        // WATCH
        // ------
        watch: {
            css: {
                files: ['app/less/*.less'],
                tasks: ['less:production'],
                options: {
                    livereload: true
                }
            },
            js: {
                files: ['app/js/app.js', 'app/js/controllers.js'],
                tasks: ['jshint:all','concat:frontend','concat:app','uglify:js'],
                options: {
                    livereload: true
                }
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // DEFAULT TASK(S)
    // ---------------
    grunt.registerTask('default', [
        'jshint:all',
        'concat:frontend',
        'concat:app',
        'uglify:js',
        'less:production'
    ]);

    // START TASK(S)
    // -------------------------
    grunt.registerTask('start', [
        'concat:plugins'
    ]);
};
