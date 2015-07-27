module.exports = function (vidCol, db) {
    var ffmpeg = require("fluent-ffmpeg"),
        path = require('path'),
        _vidCol = vidCol,
        _thumbFolder = path.relative(process.cwd(), path.normalize(_vidCol.first().folder + "\\thumbs\\")),
        async = require("async");





    function makeThumbnail(item, thumbFolder) {


        /**
         * Get the absolute path to the video
         * @param vidName
         */
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




    }


    function extractMetadata(vidCol) {
        var meta = [];

        vidCol.each(function (item) {
            console.log(item);
            meta.push(getMeta(item));
        });



        return meta;

    }

//FFMpeg Meta and Thumbnails
    function getMeta(vid) {
        var metaObj = {};
        //Get Video MetaData using ffmpeg
        ffmpeg.ffprobe(vid.path, function (err, metadata) {
            if (err) throw err;


            metaObj = {
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


        });

        return metaObj;
    }

    return {
        db: db,
        thumbFolder: _thumbFolder,
        meta: [],
        parse: function () {
            vidCol.reset();

        },
        createThumbnails: function () {
            _vidCol.each(function(v) {
                return makeThumbnail(v, this.thumbFolder);
            });

        },
        exportData: function () {
            this.db.saveData(this.meta);
        }
    };

};

