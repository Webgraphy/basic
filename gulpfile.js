'use strict';

var gulp = require('gulp');
var jade = require('gulp-jade');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('sass', function () {
    return gulp.src('./src/sass/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 version', 'safari 5', 'ie 9', 'opera 12.1', 'ios 6', 'android 4']
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./www/css'))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('templates', function () {
    gulp.src('src/templates/*.jade')
        .pipe(jade())
        .pipe(gulp.dest('./www/'))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('browser-sync', function () {
    browserSync({
        server: {
            baseDir: "./www"
        }
    });
});

gulp.task('bs-reload', function () {
    browserSync.reload();
});

gulp.task('default', ['browser-sync', 'sass', 'templates'], function () {
    gulp.watch('src/sass/**/*.scss', ['sass']);
    gulp.watch("src/templates/**/*.jade", ['templates']);
    gulp.watch("./src/*.html").on("change", browserSync.reload);
});