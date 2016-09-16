

var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var templates = require('gulp-angular-templatecache');
var minifyHTML = require('gulp-minify-html');

// Minify and templateCache your Angular Templates
// Add a 'templates2' module dependency to your app:
// var app = angular.module('appname', [ ... , 'templates2']);






/*
Minify images files

*/




const image = require('gulp-image');


gulp.task('image', function () {
  gulp.src('./www/img/*')
    .pipe(image({
      pngquant: true,
      optipng: false,
      zopflipng: true,
      jpegRecompress: false,
      jpegoptim: true,
      mozjpeg: true,
      gifsicle: true,
      svgo: true,
      concurrent: 10
    }))
    .pipe(gulp.dest('./www/dist/images'));
});








gulp.task('templates', function () {
  gulp.src([
    './**/*.html',
    '!./node_modules/**'
  ])
    .pipe(minifyHTML({
      quotes: true
    }))
    .pipe(templates('templates.js'))
    .pipe(gulp.dest('tmp'));
});
//concat js library in one file





/*
concate css files
 */

var cleanCSS = require('gulp-clean-css');

gulp.task('minify-css', function() {
  return gulp.src('./www/css/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('./www/dist'));
});



/*
-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-__--_-__--_-_-_-_-_-_-_-_-_-_-_-_
 */

var minify = require('gulp-minifier');

gulp.task('example', function() {
  return gulp.src('./www/**/*').pipe(minify({
    minify: true,
    collapseWhitespace: true,
    conservativeCollapse: true,
    minifyJS: true,
    minifyCSS: true,
    getKeptComment: function (content, filePath) {
      var m = content.match(/\/\*![\s\S]*?\*\//img);
      return m && m.join('\n') + '\n' || '';
    }
  })).pipe(gulp.dest('./www/dist'));
});










gulp.task('default',['templates'], function() {
  gulp.src([
    './www/js/app.js',
    './www/js/services.js',
    './www/js/controllers.js',

    '!./node_modules/**',
    '!./gulpfile.js',
    '!./dist/all.js'
  ])
    .pipe(concat('all.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./www/dist'));
})










// Concat and uglify all your JavaScript

/*gulp.task('default', ['templates2'], function() {
  gulp.src([
    './www/js/*.js',
    '!./node_modules/**',
    '!./gulpfile.js',
    '!./dist/all.js'
  ])
    .pipe(concat('all.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
})*/
