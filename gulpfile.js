/**
 *
 *  Backbase Widget production and test suite
 *  Copyright 2014 Backbase Inc. All rights reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License
 *
 */

'use strict';

// Include Gulp & Tools We'll Use
var colorguard = require('gulp-colorguard'),
    concat = require('gulp-concat'),
    del = require('del'),
    // filter = require('gulp-filter'),
    gulp = require('gulp'),
    gLP = require('gulp-load-plugins')(),
    gOpen = require("gulp-open"),
    qunit = require('gulp-qunit'),
    rename = require('gulp-rename'),
    runSequence = require('run-sequence'),
    stripDebug = require('gulp-strip-debug'),
    toHint = [
        './scripts/*.js'
    ];

// Clean Output Directory
gulp.task('clean', del.bind(null, ['dist']));

// Minify HTML - WORKING
// gulp.task('html', function() {
//     return gulp.src('src/*.html')
//         .pipe(gLP.minifyHtml())
//         .pipe(gulp.dest('dist'));
// });

// Scan Your HTML For Assets & Optimize Them
gulp.task('html', function() {
    gulp.src('./*.html')

    .pipe(gLP.useref.assets())
    // change this to gLP.uglify when you figure out the error
    // .pipe(gLP.
    // if ('*.js', concat('js/main.min.js')))
    .pipe(gLP.if('*.css', gLP.csso()))
        .pipe(colorguard())
        .pipe(gLP.if('*.css', gLP.autoprefixer('last 1 version')))

    .pipe(gLP.if('*.css', gLP.uncss({
        html: [
            'src/index.html'
        ],
        // CSS Selectors for UnCSS to ignore
        ignore: [
            '.navdrawer-container.open',
            /.app-bar.open/
        ]
    })))

    .pipe(gLP.useref.restore())

    .pipe(gLP.useref())

    .pipe(gLP.minifyHtml())

    .pipe(gulp.dest('dist'));
});

// Concatenate and minify CSS
gulp.task('styles', function() {
    return gulp.src([ // specify order
            './css/infographic.css'
        ])
        .pipe(gLP.autoprefixer('last 1 version'))
        .pipe(concat('main.css'))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gLP.minifyCss())
        .pipe(gulp.dest('dist/css'));
});

// Hint JS
gulp.task('jshint', function() {
    return gulp.src(toHint)
        .pipe(gLP.jshint('.jshintrc'))
        .pipe(gLP.jshint.reporter('default'));
});

// // Concatenate and minify JS
// gulp.task('scripts', ['jshint'], function() {
//     return gulp.src('src/js/*.js')
//         .pipe(stripDebug())
//         .pipe(concat('main.min.js'))
//         .pipe(gLP.uglify())
//         .pipe(gulp.dest('dist/js'));
// });

// Optimize Images
gulp.task('images', function() {
    return gulp.src('./images/**/*')
        .pipe(gLP.cache(gLP.imagemin({
            progressive: true,
            interlaced: true
        })))
        .pipe(gulp.dest('./dist/images'))
});

gulp.task('test', function() {
    return gulp.src('./tests/qunit.html')
        .pipe(qunit())
        .pipe(gOpen('./tests/qunit.html', {
            app: "Google Chrome"
        }));
});

gulp.task('open', function() {
    gulp.src('dist/index.html')
        .pipe(gOpen('dist/index.html', {
            app: "Google Chrome"
        }));
});

// copy stub data (and for now, scripts)
var filesToMove = [
    'src/stubData/**/*',
    'src/js/**/*'
];

gulp.task('move', function() {
    gulp.src(filesToMove, {
        base: 'src'
    })
        .pipe(gulp.dest('dist'));
});

// Build Production Files
gulp.task('build', ['html', 'styles', 'images', 'move'], function(cb) {
    runSequence(['test', 'open'], cb);
});

// Default Task
gulp.task('default', ['clean'], function(cb) {
    gulp.start('build', cb);
});