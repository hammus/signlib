module.exports =function(grunt){
    grunt.initConfig({
        jsdoc : {
            dist: {
                src: [
                    'js/services/LocalDataService.js'
                ],
                options: {
                    destination: 'docs/',
                    configure: 'node_modules/angular-jsdoc/conf.json',
                    template: 'node_modules/angular-jsdoc/template'
                }
            }
        },
        nwjs: {
            options: {
                platforms: ['win','osx'],
                buildDir: './webkitbuilds' // Where the build version of my NW.js app is saved
            },
            src: ['./**/*'] // Your NW.js app
        }
    });

    grunt.loadNpmTasks('grunt-nw-builder');
    grunt.loadNpmTasks('grunt-jsdoc');


    grunt.registerTask('build', ['nwjs']);
    grunt.registerTask('doc', ['jsdoc:dist']);

};

