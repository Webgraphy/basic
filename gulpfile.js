'use strict';

var gulp = require('gulp');
var fileinclude = require('gulp-file-include');
const sass = require('gulp-sass')(require('node-sass'));
var browserSync = require('browser-sync');


function css() {
    return gulp.src('./src/sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./www/css'))
        .pipe(browserSync.reload({stream: true}));
}

function templates () {
    return gulp.src(['./src/templates/category.html'])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest('./www/'))
        .pipe(browserSync.reload({stream: true}));
}

function browser() {
    browserSync.init({
        server: {
            baseDir: "./www"
        }
    });

    gulp.watch('./src/sass/**/*.scss', { usePolling: true }, css);
    gulp.watch('./src/templates/**/*.html', { usePolling: true }, templates);
}

exports.default = gulp.series(css, templates, browser);