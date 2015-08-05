/**
 * Created by Liam on 5/08/2015.
 */

/*
ES2015 (ES6 HArmony) Transpiled to ES5 with Babel see $$thisFile$$-compiled.js for ES5 version.
 */
'use strict';

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var File = function File(filepath, categories, tags) {
    _classCallCheck(this, File);

    var fileSplit = filepath.split('\\');
    this.filename = fileSplit[fileSplit.length - 1];
    this.name = this.filename.split('.')[0];
    this.path = filepath;
    this.categories = categories;
    this.tags = tags;
};

var Video = (function (_File) {
    _inherits(Video, _File);

    function Video(filepath, categories, tags, duration, format, width, height) {
        _classCallCheck(this, Video);

        _get(Object.getPrototypeOf(Video.prototype), 'constructor', this).call(this, filepath, categories, tags);
        var fileSplit = filepath.split('\\');
        this.duration = duration;
        this.format = format;
        this.width = width;
        this.height = height;
        this.thumb = this.path.split('\\')[0] + "\\thumbs\\" + this.name + "-thumb.png";
    }

    return Video;
})(File);

var adamVid = new Video("videos\\Adam.webm", [], [], 4.571233, "h264", 720, 480);

console.log(adamVid);

//# sourceMappingURL=DataInterface-compiled.js.map