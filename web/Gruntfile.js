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
                    'app/js/vendor/face.js'
                ],
                dest: 'app/js/plugins.js'
            },
            // FRONTEND
            angular: {
                src: [
                    'app/js/app.js',
                    'app/js/controllers.js'
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
                    'app/js/app.min.js': 'app/js/app.js'
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
