/**
 * Created by ewelinaczarny on 20.11.14.
 */

var config = require('./build.config.js');

var gulp = require('gulp');
var sass = require('gulp-sass');
var inject = require('gulp-inject');

var concat = require('gulp-concat');
var filter = require('gulp-filter');
var mainBowerFiles = require('main-bower-files');
var webserver = require('gulp-webserver');
var clean = require('gulp-clean');

var filterByExtension = function(extension){
    return filter(function(file){
        return file.path.match(new RegExp('.' + extension + '$'));
    });
};


gulp.task('vendor', function(){

    var mainFiles = mainBowerFiles({
        paths: {
            bowerDirectory: 'vendor',
            bowerrc: '.bowerrc',
            bowerJson: 'bower.json'
        }
    });

    if(!mainFiles.length){
        return;
    }

    var jsFilter = filterByExtension('js');

    return gulp.src(mainFiles)
        .pipe(jsFilter)
        .pipe(gulp.dest(config.build_dir + '/assets/js/vendor'))
        .pipe(jsFilter.restore())
        .pipe(filterByExtension('css'))
        .pipe(gulp.dest(config.build_dir + '/assets/css/vendor'))
});

gulp.task('sass', function () {
    return gulp.src(config.app_files.sass + '/*.scss')
        .pipe(sass({
            errLogToConsole: true
        }))
        .pipe(gulp.dest(config.build_dir + '/assets/css'));
});

//task to move files to our build folder
gulp.task('build', ['sass', 'vendor'], function(){

    //inject proper css files and move index.html TODO js files
    var sources = gulp.src([
            config.build_dir + '/assets/js/vendor/*.js',
            config.build_dir + '/assets/js/*.js',
            config.build_dir + '/assets/css/vendor/*.css',
            config.build_dir + '/assets/css/*.css'
        ], {read: false});

    return gulp.src('./src/index.html')
        .pipe(inject(sources))
        .pipe(gulp.dest(config.build_dir));
});

//task to move files to our bin folder
gulp.task('bin', ['sass'], function(){

});
//task to clean build folder
gulp.task('clean', function () {
  return gulp.src('build', {read: false})
    .pipe(clean());
});

//gulp-webserver
gulp.task('webserver', function() {
  gulp.src('build')
    .pipe(webserver({
      livereload: true,
      directoryListing: false,
      open: true
    }));
});


//watcher of files
gulp.task('watch', ['build', 'bin'], function(){
    //watch scss files
    gulp.watch(config.app_files.sass + '/**/*.scss', ['sass']);

    //watch index.html file
    gulp.watch(config.app_files.html, ['build', 'bin']);
});