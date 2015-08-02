module.exports =function(grunt){
    grunt.initConfig({

        compress: {
            videos: {
                options: {
                    archive: 'build/videos.zip'
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




    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.registerTask('zipitup', ['compress']);

};

