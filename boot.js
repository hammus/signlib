var gui = require('nw.gui');
var FileManager = require('FileManager');
var DataManager = require('DataManager');
var GitHubApi = require('github');
var github = new GitHubApi({
    version: "3.0.0"
});

var token = "306c1d9faa631adc6c2f792ae6e04001d573d716";

var config = FileManager.config;
var videoData, compicData;

compicData = DataManager.loadCompicData();
videoData = DataManager.loadVideoData();

global.exports = {
    data: {
        videos: videoData,
        compics: compicData
    },
    config: config,
    fileManager: FileManager,
    dataManager: DataManager
};

var oldVer = new Date(config.version);
var headers = {
    "If-Modified-Since": oldVer.toISOString(),
    "User-Agent": "hammus"
};

github.releases.listReleases({
    owner: "hammus",
    repo: "signlib",
    headers: headers
}, function (err, data) {


    if (err) {
        return console.log(err.message);
    }

    var ver = new Version(data[0]);

    if (ver.isNew(oldVer)) {
        console.log("New Version Found ");
        window.document.getElementById("load_text").innerHTML = "Updating..."

        download(process.cwd() + "/update.zip", startApp)
    }


});


function startApp() {
    var thisWin = gui.Window.get();
    var appWin = gui.Window.open('index.html', {
        position: 'center',
        width: 1024,
        height: 728,
        frame: true,
        toolbar: false
    });

    //Wait for the main App Window to load and then switch to it and hide the loading window
    appWin.on('loaded', function () {
        this.focus();
        thisWin.hide();
    });

}

/**
 * A convenience wrapper for Github Release metadata
 * @param obj
 * @constructor
 */
function Version(obj) {
    this.date = new Date(obj.published_at);
    this.isNew = function (dt) {

        return this.date > dt;
    };
    this.zipUrl = obj.zipball_url;
    this.prerelease = obj.prerelease;

}


var download = function (dest, cb) {
    var fs = require('fs');
    var request = require('request');

    request('https://github.com/hammus/signlib/archive/master.zip')
        .pipe(fs.createWriteStream(dest));

    cb();
}

