global.exports = (function () {

    var FileManager = require('FileManager');
    var DataManager = require('DataManager');
    var appData = DataManager.load();

    return  {
        data: appData,
        fileManager: FileManager,
        dataManager: DataManager
    };


})();




