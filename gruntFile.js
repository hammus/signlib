module.exports =function(grunt){
    grunt.initConfig({
        nwjs: {
            options: {
                platforms: ['win','osx'],
                buildDir: './webkitbuilds', // Where the build version of my NW.js app is saved
            },
            src: ['./**/*'] // Your NW.js app
        }
    });

    grunt.loadNpmTasks('grunt-nw-builder');

    grunt.registerTask('build', ['nwjs']);
};

