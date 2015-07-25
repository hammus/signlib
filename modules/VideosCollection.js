module.exports = (function (videos) {
    var path = require('path');
    var Iterator = require('modules/BasesClasses/Iterator.js');
    var model = new Iterator.extend({
            name: function () {
                return this.current().name;
            },
            filename: function () {
                return this.current().filename;
            },
            folder: function() {
                return this.current().folder;
            },
            path: function() {
                return this.current().path;
            }
    });

    for (var v in videos) {
        model.push(
            {
                name: path.basename(videos[v], path.extname(videos[v])),
                filename: path.basename(videos[v]),
                folder: path.dirname(videos[v]),
                path: videos[v]
            });
    }


    return model;
})(videos);