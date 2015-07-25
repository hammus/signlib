/**
 * Node Module (Not Angular)
 * Database
 * Contains all the data I/O functions for the datafile.
 */



module.exports = function(){
    var jf = require('jsonfile');
    return {
            saveData: function(configFile, data)
            {
                jf.writeFileSync(configFile, data)
            },

            readDataFile: function(dataFile){
                if (fs.existsSync(CONFIG.dataFile)) {
                    //data file exists load it
                    var data = jf.readFileSync(CONFIG.dataFile, {throws: true});
                    return data;

                } else {

                    var VideoParser = require('modules/VideoParser.js');
                    VideoParser.parse();
                    VideoParser.createThumbnails();
                    var meta = VideoParser.meta;

                }
            }
        }
    };


