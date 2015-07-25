/**
 * Node Module (Not Angular)
 * Database
 * Contains all the data I/O functions for the datafile.
 */



module.exports = function(){
    var jf = require('jsonfile'),
        fs = require('fs'),
        dataFile = "data.json";

    function saveData(file, data)
    {
        jf.writeFileSync(file, data);
    }

    return {

            saveData: function(data){
                saveData(dataFile, data);
            },
            getDataFile: function(){
                if (fs.existsSync(this.dataFile)) {
                    //data file exists load it
                    return jf.readFileSync(this.dataFile, {throws: true});

                } else {

                    var VideoParser = require('modules/VideoParser.js');
                    VideoParser.parse();
                    VideoParser.createThumbnails();
                    var meta = VideoParser.meta;

                }
            }
        }
    };


