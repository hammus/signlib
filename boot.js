global.exports = (function () {

    var FileManager = require('FileManager');
    var DataManager = require('DataManager');

    var config = FileManager.config;
    var videoData, compicData;

    compicData = DataManager.loadCompicData();
    videoData = DataManager.loadVideoData();


    return {
        data: {
            videos: videoData,
            compics: compicData
        },
        config: config,
        fileManager: FileManager,
        dataManager: DataManager
    };


})();




