var path = require('path');

module.exports = {
    entry: {
        App: './app/src/js/App.js',
        Vendor: './app/src/js/Vendor.js'
    },
    output: {
        path: path.resolve(__dirname, './app/temp/js'),
        filename: '[name].js'
    }
}