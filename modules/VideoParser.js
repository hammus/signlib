module.exports = function (vidCol) {
    var model = require("model"),
        ffmpeg = require("fluent-ffmpeg"),
        db = require('modules/Database.js'),
        path = require('path'),
        currentVideo = 0,
        metaArray = [];
    var thumbFolder = path.relative(process.cwd(), path.normalize(vidCol.first().folder + "\\thumbs\\"));




    var rtn = {
            meta: [],
            parse: function (vidCol) {
                this.meta = extractMetadata(vidCol);
                this.exportData();
            },
            createThumbnails: function (vidCol) {
                return doThumbs(vidCol)
            },
            exportData: function () {
                db.saveData(this.meta);
            }
        };



    function doThumbs(item, thumbFolder) {

        item.each(function(item) {

            function thumbFile(vidName) {
                return path.join(thumbFolder, path.basename(vidName + "-thumb", path.extname((vidName))) + ".png");
            }

            if (fs.existsSync(thumbFile(item.filename))) {
                item.thumb = thumbFile(item.filename);
                return;
            }

            if (!fs.existsSync(path.dirname(item.thumbFolder))) {
                fs.mkdirSync(path.dirname(thumbFolder));
                genThumb = true;
            }

            //create thumbnail
            try {
                ffmpeg(item.path).screenshots({
                    timestamps: ["50%"],
                    filename: thumbFile(item.filename),
                    folder: thumbFolder,
                    size: "160x120"
                });
            } catch (e) {
                console.log("FFMPEG Error: " + e.message);

            }



        });

        return result;
    }


    function extractMetadata(vidCol)
    {
        var meta = [];
        vidCol.each(function(item) {
            meta.push(getMeta(item));
        });
        return meta;
    }

//FFMpeg Meta and Thumbnails
    function getMeta(vid) {

            //Get Video MetaData using ffmpeg
            ffmpeg.ffprobe(vid.path, function (err, metadata) {
                if (err) throw err;


                var meta = {
                    name: path.basename(metadata.format.filename, path.extname(metadata.format.filename)),
                    filename: path.basename(metadata.format.filename),
                    path: path.relative(process.cwd(), metadata.format.filename),
                    duration: metadata.streams[0].duration,
                    codec: metadata.streams[0].codec_name,
                    width: metadata.streams[0].width,
                    height: metadata.streams[0].height,
                    thumb: thumbFolder,
                    categories: [],
                    tags: []
                };

               return meta

            });
        }




};

