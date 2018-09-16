var gulp = require('gulp'),
    watch = require('gulp-watch'),
    browserSync = require('browser-sync').create(),
    nodemon = require('gulp-nodemon');

gulp.task('watch', ['nodemon'], function() {
    // start browser sync
    browserSync.init({
        notify: false,
        proxy: 'http://localhost:8000'
    });

    // perform watch tasks
    watch('./app/views/**/*.ejs', function() {
        browserSync.reload();
    });

    watch('./app/src/css/**/*.css', function() {
        gulp.start('cssInject');
    });

    watch('./app/src/js/**/*.js', function() {
        browserSync.reload();
    });
});

gulp.task('nodemon', ['styles', 'scripts'], function(cb) {

    var started = false;

    return nodemon({
        script: 'app.js',
        ext: 'js',
        ignore: [
            'node_modules',
            'gulpfile.js',
            'Vendor',
            'app',
            'gulp',
            'dist'
        ]
    }).on('start', function() {
        if (!started) {
            cb();
            started = true;
        }
    });
});

gulp.task('cssInject', ['styles'], function() {
    return gulp.src('./app/temp/css/styles.css')
        .pipe(browserSync.stream());
});