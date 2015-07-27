/**
 * Created by Liam on 27/07/2015.
 */

/**
 * @context Node
 */
var readDir = require('readdir'),
    path = require('path'),
    CONFIG = require(path.join(process.cwd(), 'config.json')),
    jf = require('jsonfile'),
    fs = require('fs');

function model() {
    /* Gets the Path containing the folders from the config module */
    var getVideoPath = function (video) {
        return path.join(path.normalize(CONFIG.folders.videoRoot), video);
    };

    /* Filter files in a Directory by extensions provided in the second args array */
    var getFilesArray = function (pathname, extensions) {

        return readDir.readSync(pathname, extensions, readDir.ABSOLUTE_PATHS + readDir.CASELESS_SORT);

    };

    var vidPath = process.cwd() + "/";


//Get the Video Files, filter by the extensions from the CONFIG file.
    videos = getFilesArray(CONFIG.folders.videoRoot, CONFIG.extensions.videos);

    var model = Array();

    for (var v in videos) {
        model.push(
            {
                name: path.normalize(path.basename(videos[v], path.extname(videos[v]))),
                filename: path.normalize(path.basename(videos[v])),
                folder:path.normalize(path.dirname(videos[v])),
                path: path.normalize(videos[v])
            });
    }

    console.dir(model);
    return {
        videos: model,
        length: model.length
    };

}

function filecheck() {
    jf.spaces = '\t';

    if (fs.existsSync(CONFIG.dataFile)) {
        //data file exists load it
        return require(CONFIG.dataFile);

    } else {

        var model = require("model"),
            ffmpeg = require("fluent-ffmpeg"),
            lastVideo = model.videos.length - 1,
            currentVideo = 0,
            data,
            metaArray = Array();

        function storeData(obj) {
            metaArray.push(obj);
        }

        function finished() {
            jf.writeFileSync(CONFIG.dataFile, metaArray);
            return metaArray;
        }

        function loop(fin) {
            var workingArray = Array();

            if (currentVideo <= lastVideo) {
                var genThumb = false;


                //Get Video MetaData using ffmpeg
                ffmpeg.ffprobe(model.videos[currentVideo].path, function (err, metadata) {
                    if (err) throw err;

                    var vidName = path.basename(metadata.format.filename, path.extname(metadata.format.filename));
                    var vidFilename = path.basename(metadata.format.filename);
                    var vidPath = path.normalize(metadata.format.filename);
                    var vidDuration = metadata.format.duration;
                    var vidFormat = metadata.streams[0].codec_name;
                    var thumbFolder = path.relative(process.cwd(), path.normalize(path.dirname(metadata.format.filename) + "\\thumbs\\" + vidName + "-thumb.png"));

                    console.log(vidFilename + ": " + vidDuration);

                    if (!fs.existsSync(path.dirname(thumbFolder))) {
                        fs.mkdirSync(path.dirname(thumbFolder));
                        genThumb = true;
                    }

                    var meta = {
                        name: path.basename(metadata.format.filename, path.extname(metadata.format.filename)),
                        filename: path.basename(metadata.format.filename),
                        path: path.relative(process.cwd(), metadata.format.filename),
                        duration: metadata.streams[0].duration,
                        format: metadata.streams[0].codec_name,
                        width: metadata.streams[0].width,
                        height: metadata.streams[0].height,
                        thumb: thumbFolder,
                        categories: [],
                        tags: []
                    };

                    if (genThumb) {

                        var thumbFilename = vidName + "-thumb.png";

                        ffmpeg(metadata.format.filename).screenshots({
                            timestamps: ["50%"],
                            filename: thumbFilename,
                            folder: path.dirname(thumbFolder),
                            size: "160x120"
                        });

                    }

                    storeData(meta);
                    currentVideo++;
                    loop(fin);

                });
            } else {
                fin();
            }


        }

        loop(finished);


    }

    //if (fs.existsSync(CONFIG.compicsDataFile)) {
    //
    //} else {
    //    console.log("Compic Metadata file not found, creating...");
    //
    //    var filesys = require("filesystem");
    //    var compicFiles = filesys.getFilesArray(CONFIG.folders.compicsRoot, CONFIG.extensions.compics);
    //
    //    for (pic in compicFiles) {
    //
    //    }
    //
    //}

}

console.dir(filecheck());
console.dir(model());
