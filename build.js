var compressor = require('node-minify');

var toLoad = 2;
var hasError = false;
var loaded = function(err, msg) {
    toLoad--;
    
    if (err) {
        console.log(err);
    }
    else {
        console.log(msg);
    }
    
    if (toLoad == 0) {
        if (hasError) {
            console.log("Build success with error(s).");
        }
        else {
            console.log("Build success!");
        }
    }
}

// Concate, no-minify
new compressor.minify({
    type: 'no-compress',
    fileIn: ['lib/JsBarcode/JsBarcode.js', 'lib/JsBarcode/CODE128.js', 'pankkiviivakoodi.js'],
    fileOut: 'dist/pankkiviivakoodi-all.js',
    callback: function(err, min){
        loaded("Concate done.");
    }
});

// Concate and minify
new compressor.minify({
    type: 'gcc',
    fileIn: ['lib/JsBarcode/JsBarcode.js', 'lib/JsBarcode/CODE128.js', 'pankkiviivakoodi.js'],
    fileOut: 'dist/pankkiviivakoodi-all.min.js',
    callback: function(err, min){
        loaded("Minify done.");
    }
})
