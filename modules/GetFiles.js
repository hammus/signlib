/**
 * Get All of the Video Files
 * Formerly: model
 * @desc Node Module (not Angular)
 * @returns {{getVideoPath: Function, getFilesArray: Function}}
 */
module.exports = function () {

    var readDir = require('readdir'),
        path = require('path');

    return {
        /* Gets the Path containing the folders from the config module */
        getVideoPath: function (video) {
            return path.join(path.normalize(CONFIG.folders.videoRoot), video);
        }
        ,
        /* Filter files in a Directory by extensions provided in the second args array */
        getFilesArray: function (pathname, extensions) {

            return readDir.readSync(pathname, extensions, readDir.ABSOLUTE_PATHS + readDir.CASELESS_SORT);

        }

    }




};


