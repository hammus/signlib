var path = require("path");

module.exports = {
    folders : {
        videoRoot : path.normalize(process.cwd() + '\\videos\\'),
        appRoot : process.cwd(),
        compicsRoot: path.normalize(process.cwd() + '\\compics\\'),
        ffmpeg: path.normalize(process.cwd() + '\\ffmpeg\\')
    },

    "extensions" : {
        videos: [
            //"**.webm",
            //"**.ogg"
        "**.mp4",
        "**.m4v",
        "**.avi",
        "**.mov",
        "**.wmv"
    ], compics: [
            "**.gif",
            "**.jpg",
            "**.jpeg",
            "**.png",
            "**.bmp"
        ]},
    dataFile : path.normalize(process.cwd() + "\\data.json"),
    compicsDataFile : path.normalize(process.cwd() + "\\compics.json")

}
