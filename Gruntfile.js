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
                    'web/js/vendor/ccv.js',
                    'web/js/vendor/face.js'
                ],
                dest: 'web/js/plugins.js'
            },
            // FRONTEND
            angular: {
                src: [
                    'web/js/app.js',
                    'web/js/controllers.js'
                ],
                dest: 'web/js/script.js'
            }
        },

        // JSHINT
        // ------
        jshint: {

            // ALL
            all: [
                'web/js/app.js',
                'web/js/controllers.js'
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
                    'web/js/app.min.js': 'web/js/app.js'
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
                    "web/css/style.css": "web/less/style.less"
                }
            }
        },

        // WATCH
        // ------
        watch: {
            css: {
                files: ['web/less/*.less'],
                tasks: ['less:production'],
                options: {
                    livereload: true
                }
            },
            js: {
                files: ['web/js/app.js', 'web/js/controllers.js'],
                tasks: ['jshint:all','concat:angular'],
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
        'concat:angular',
        'less:production'
    ]);

    // START TASK(S)
    // -------------------------
    grunt.registerTask('start', [
        'concat:plugins'
    ]);
};
