/**
 * Created by Liam on 5/08/2015.
 */


/*
ES2015 (ES6 HArmony) Transpiled to ES5 with Babel see $$thisFile$$-compiled.js for ES5 version.
 */
class File {
    constructor(filepath, categories, tags) {
        var fileSplit = filepath.split('\\');
        this.filename = fileSplit[fileSplit.length -1];
        this.name = this.filename.split('.')[0];
        this.path = filepath;
        this.categories = categories;
        this.tags = tags;


    }


}

class Video extends File {
    constructor(filepath, categories, tags, duration, format, width, height) {
        super(filepath, categories, tags);
        var fileSplit = filepath.split('\\');
        this.duration = duration;
        this.format = format;
        this.width = width;
        this.height = height;
        this.thumb = this.path.split('\\')[0] + "\\thumbs\\" + this.name + "-thumb.png";

    }
}


var adamVid = new Video("videos\\Adam.webm", [], [], 4.571233, "h264", 720, 480);


console.log(adamVid);

