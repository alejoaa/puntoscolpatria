var gulp = require('gulp'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    cssvars = require('postcss-simple-vars'),
    nested = require('postcss-nested'),
    cssImport = require('postcss-import'),
    mixins = require('postcss-mixins'),
    hexrgba = require('postcss-hexrgba');

gulp.task('customStyles', function() {
    return gulp.src('./app/src/css/styles.css')
        .pipe(postcss([cssImport, mixins, cssvars, nested, hexrgba, autoprefixer]))
        .on('error', function(errorInfo) {
            console.log(errorInfo.toString());
            this.emit('end');
        })
        .pipe(gulp.dest('./app/temp/css'))
});

gulp.task('vendorStyles', function() {
    return gulp.src('./app/src/css/vendor.css')
        .pipe(postcss([cssImport]))
        .on('error', function(errorInfo) {
            console.log(errorInfo.toString());
            this.emit('end');
        })
        .pipe(gulp.dest('./app/temp/css'))
});

gulp.task('styles', ['customStyles', 'vendorStyles']);