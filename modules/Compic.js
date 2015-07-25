//Compic Class
function Compic(filename) {
    var picName = path.basename(filename, path.extname(filename));
    var picFilename = path.basename(filename);
    var picPath = path.normalize(CONFIG.folders.compicsRoot, filename);

    return {
        name: picName,
        filename: picFilename,
        path: picPath,
        tags: [],
        categories: []
    }
}