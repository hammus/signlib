/**
 * Get All of the Video Files
 * Formerly: model
 * @desc Node Module (not Angular)
 * @returns {{getVideoPath: Function, getFilesArray: Function}}
 */
module.exports = (function () {

        var readDir = require('readdir'),
            path = require('path');

        return {
            getVideoPath: function (video, videoRoot) {
                if (typeof(videoRoot) == 'Object') {
                    //Convenience for this App, accept the CONFIG object but keep it reusable
                    videoRoot = videoRoot.folders.videoRoot;
                } else if (typeof(videoRoot) !== 'String') {
                    throw new Error("The 2nd argument to this function must be a string or object.");
                }

                return path.join(path.normalize(videoRoot), video);
            }
            ,
            getFilesArray: function (pathname, extensions) {

                return readDir.readSync(pathname, extensions, readDir.ABSOLUTE_PATHS + readDir.CASELESS_SORT);

            }

        }
    })
    ();







