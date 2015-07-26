module.exports = function (videos, Iterator) {


    Iterator = Iterator || require('modules/BasesClasses/Iterator.js');
    var path = require('path');

    var model = new Iterator();

    for (var v in videos) {
        model.add(
            {
                name: path.normalize(path.basename(videos[v], path.extname(videos[v]))),
                filename: path.normalize(path.basename(videos[v])),
                folder: path.normalize(path.dirname(videos[v])),
                path: path.normalize(videos[v])
            });
    }


    return model;
};