var expect = require('chai').expect;
var CONFIG = require("../config.js");
var GetFiles = require("../modules/GetFiles.js");
var Iterator = require("../modules/BaseClasses/Iterator.js");
var videos = GetFiles.getFilesArray(CONFIG.folders.videoRoot, CONFIG.extensions.videos);
var vidCol = require('../modules/VideosCollection.js')(videos, Iterator);
var db = require("../modules/database.js")(CONFIG);
var vidParser = require("../modules/VideoParser.js")(vidCol, db);
var fs = require('fs');
var path = require('path');

describe("Module that gets the video files from the specified folder", function () {


    it("should return a JSON object from the config file", function () {
        expect(CONFIG).to.be.a('object');
        expect(CONFIG).to.have.all.keys("folders", "extensions", "dataFile", "compicsDataFile", "root");
        expect(CONFIG.folders).to.be.a('object');
    });

    it("should have the getFilesArray and getVideoPath properties", function () {
        expect(GetFiles).to.have.all.keys("getFilesArray", "getVideoPath");
        expect(GetFiles).to.have.a.property("getVideoPath");

    });

    it("should contain an array of files", function () {
        expect(videos).to.be.a('Array');
        expect(videos).to.have.length.of.at.least(2);
    });


});

describe("A custom Collection Object containing video paths structured for parsing.", function () {

    it("should be an Iterator object that is the same length as the base videos array", function () {
        expect(vidCol).to.be.an('object');
        expect(vidCol.length()).to.equal(videos.length);
    });


});

describe("Database Object: contains IO stuff for the JSON data file.", function () {

    it("should return a JSON object if the data.json file exists", function () {
        expect(db).to.be.an('object');
        expect(db).to.have.all.keys("saveData", "getDataFile");
    });

});

describe("VideoParser loops through Video files, gets metadata", function () {

    it("should be an object with the following keys: db, thumbFolder, meta, parse, createThumbnails, exportData", function () {
        expect(vidParser).to.be.an('object');
        expect(vidParser).have.all.keys('db', 'thumbFolder', 'meta', 'parse', 'createThumbnails', 'exportData');
    });

    it("should generate a data file when parse() is called", function () {



        vidParser.parse();


        var exists = fs.existsSync(path.join(process.cwd(), 'data.json'));
        expect(exists).to.be.true;
    });

});