/**
 * Reads and rights from the app data file
 * @param {Object} CONFIG - Accepts a CONFIG object that should be immutable as it contains no state related data just paths
 * @returns {{saveData: Function, getDataFile: Function}}
 */
module.exports = function(CONFIG){
    var jf = require('jsonfile'),
        fs = require('fs'),
        dataFile = CONFIG.dataFile;

    function saveData(file, data)
    {
        jf.writeFileSync(file, data);
    }

    function createDataFile()
    {
        var VideoParser = require(process.cwd() + '/modules/VideoParser.js');
        VideoParser.parse();
        VideoParser.createThumbnails();

    }

    return {

            saveData: function(data){
                saveData(dataFile, data);
            },
            getDataFile: function(){
                if (!fs.existsSync(this.dataFile)) {
                    createDataFile.call(this);
                }
                    //data file exists load it
                    return jf.readFileSync(this.dataFile, {throws: true});


            }

        }
    };


