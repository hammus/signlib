global.exports = (function () {

    var FileManager = require('FileManager');
    var DataManager = require('DataManager');
    var videoData = DataManager.loadVideoData();
    var compicData = DataManager.loadCompicData();
    var config = FileManager.config;



    return  {
        data: {
            videos: videoData,
            compics: compicData
        },
        config: config,
        fileManager: FileManager,
        dataManager: DataManager
    };


})();




