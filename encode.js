/**
 * Created by Liam on 22/07/2015.
 */
var CONFIG = require('config.js');
var path = require('path');
var ffmpeg = require('fluent-ffmpeg');
var filesys = require('filesystem');
var fs = require('fs');
var EOL = require('os').EOL;


var fArr = filesys.getFilesArray("E:\\India AVI\\mp4\\", CONFIG.extensions.videos);
var outputArray = [];
var i =0; //Counter for the recursive func
for (f in fArr)
{
//Get all files to encode and output
    var npath = fArr[f] = path.normalize(fArr[f]);
    outputArray.push(path.join(path.join(path.dirname(npath), "\\webm\\"),
            path.basename(npath, path.extname(npath)) + '.webm'));



}
var metaArray = [];


function getMeta(i)
{
    var input = fArr[i];
    ffmpeg(input).ffprobe(function(err, data) {
        if(err) throw err;
        metaArray.push(data);
        console.log(data.format.duration);
        i++;
        if(i < fArr.length)
        {
            getMeta(i);
        } else {
            var jf = require('jsonfile');
            jf.spaces = '\t';
            jf.writeFileSync("meta.json", metaArray);
        }

    })
}

doEncode(i);

function doEncode(i) {

    var input = fArr[i];
    var output = outputArray[i];

    if(!fs.existsSync(path.dirname(output)))
        fs.mkdirSync(path.dirname(output));

    console.log(EOL + "Processing File " + (i+1) + " of " +
        fArr.length + EOL + "Encoding " + path.basename(output) + EOL);

    ffmpeg(input)
        .videoCodec('libvpx')
        .videoBitrate(500)
        .on('error', function(err) {
            console.log("Error: " + err.message);
        })
        .on('progress', function(args) {
          process.stdout.clearLine();
            process.stdout.cursorTo(0);
            process.stdout.write(Math.floor(args.percent) + "% complete.");
        })
        .on('end', function() {
            i++;
            if(i < fArr.length) {
                doEncode(i);
            } else {
                console.log("Encoding completed successfully.")
            }


        })
        .save(output);

}
