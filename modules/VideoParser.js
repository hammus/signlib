module.exports = function() {
    var model = require("model"),
    ffmpeg = require("fluent-ffmpeg"),
    lastVideo = model.videos.length - 1,
    currentVideo = 0,
    data,
    metaArray = Array();


    var rtnObj = {
      createThumbnails: function() {

      }
    };


function storeData(obj) {
    metaArray.push(obj);
}

function finished() {
    jf.writeFileSync(CONFIG.dataFile, metaArray);
    module.exports = metaArray;
}

//FFMpeg Meta and Thumbnails
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

            if(!fs.existsSync(path.dirname(thumbFolder)))
            {
                fs.mkdirSync(path.dirname(thumbFolder));
                genThumb = true;
            }

            var meta = {
                name: path.basename( metadata.format.filename, path.extname( metadata.format.filename )),
                filename: path.basename( metadata.format.filename ),
                path: path.relative(process.cwd(), metadata.format.filename ),
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


};

