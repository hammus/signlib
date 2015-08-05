module.exports =function(grunt){
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        buildFolder: 'build',
        processhtml: {
          options: {

          },
            build: {
                files: {
                    "build/index.html" : ['index.html']
                }

            }
        },
        concat: {
            options: {
                separator: ';\n'
            },
            build: {
                src: ["node_modules/angular/angular.js",
                    "node_modules/angular-route/angular-route.js",
                    "node_modules/ng-lodash/build/ng-lodash.js",
                    "bower_components/ng-tags-input/ng-tags-input.js",
                    "node_modules/angular-local-storage/dist/angular-local-storage.js",
                    "bower_components/jquery/dist/jquery.js",
                    "bower_components/bootstrap/dist/js/bootstrap.min.js",
                    "bower_components/videojs/dist/video-js/video.dev.js",
                    "js/app.js",
                    "js/services/LocalDataService.js",
                    "js/controllers/controller.js",
                    "js/directives/directives.js",
                    "bower_components/angular-route-styles/route-styles.js"],
                dest: '<%= buildFolder %>/frontend.js'
            }

        },

        compress: {
            videos: {
                options: {
                    archive:  '<%= buildFolder %>/videos.zip'
                },
                mode: 'zip',
                files: [
                    {src: ['videos/**'], dest: './'}

                ]
            },
            compics: {
                options: {
                    archive: 'build/compics.zip'
                },
                mode: 'zip',
                files: [
                    {src: ['compics/**'], dest: './'}
                ]
            }

        }

    });


    /**
     * Zip media
     * Concatenate js and css
     * minify?
     * Parse the index file?
     *
     */


    grunt.loadNpmTasks('grunt-processhtml');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.registerTask('zipitup', ['compress']);
    grunt.registerTask('build', ['concat', 'processhtml']);

};


