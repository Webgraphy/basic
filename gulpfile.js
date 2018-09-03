'use strict';

var gulp = require('gulp');
var jade = require('gulp-jade');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync');
var image = require('gulp-image');

gulp.task('sass', function () {
    return gulp.src('./src/sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 version', 'safari 5', 'ie 9', 'opera 12.1', 'ios 6', 'android 4']
        }))
        .pipe(gulp.dest('./www/css'))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('templates', function () {
    gulp.src('./src/templates/*.jade')
        .pipe(jade({
            pretty: true
        }))
        .pipe(gulp.dest('./www/'))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('images', function () {
    gulp.src('./images/**/*')
        .pipe(image({
            pngquant: true,
            optipng: false,
            zopflipng: true,
            jpegRecompress: false,
            mozjpeg: true,
            guetzli: false,
            gifsicle: true,
            svgo: true,
            concurrent: 10,
            quiet: true // defaults to false
        }))
        .pipe(gulp.dest('./newimages'))
});

gulp.task('browser-sync', function () {
    browserSync({
        server: {
            baseDir: "./www"
        }
    });
});

gulp.task('default', ['browser-sync', 'sass', 'templates'], function () {
    gulp.watch('./src/sass/**/*.scss', ['sass']);
    gulp.watch('./src/templates/**/*.jade', ['templates']);
    gulp.watch('./src/*.html').on('change', browserSync.reload);
});