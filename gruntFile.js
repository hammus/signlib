module.exports =function(grunt){
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        buildFolder: 'build',
        concat: {
            options: {
                separator: ';\n'
            },
            build: {
                src: ['node_modules/*.js', "node_modules/angular/angular.js",
                    "node_modules/angular-route/angular-route.js",
                    "node_modules/ng-lodash/build/ng-lodash.js",
                    "node_modules/angular-local-storage/dist/angular-local-storage.js"],
                dest: '<%= buildFolder %>/node_app.js'
            }

        },

        compress: {
            videos: {
                options: {
                    archive: 'build/git videos.zip'
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


    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.registerTask('zipitup', ['compress']);
    grunt.registerTask('conc', ['concat']);

};