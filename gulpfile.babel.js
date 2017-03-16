'use babel';

import gulp from 'gulp'
import runSequence from 'run-sequence'
import stylus from 'gulp-stylus'
import cleanCSS from 'gulp-clean-css'
import sourcemaps from 'gulp-sourcemaps'
import rename  from 'gulp-rename'
import clean from 'gulp-clean'

let cssSrcDir = 'src/css'
let cssDestDir = 'static/css'

gulp.task('clean-css', function() {
  return gulp.src(cssDestDir)
    .pipe(clean())
})

gulp.task('stylus-to-css', function() {
  return gulp.src([cssSrcDir+'/styles.styl'])
    .pipe(stylus())
    .pipe(gulp.dest(cssDestDir))
})

gulp.task('minify-css', function () {
  return gulp.src([cssDestDir+'/*.css','!'+cssDestDir+'/*.min.css'])
    .pipe(sourcemaps.init())
    .pipe(cleanCSS(
      {debug: true, inline: 'none'},
      function(details) {
        console.log(details.name + ': ' + details.stats.originalSize
           + " => " + details.stats.minifiedSize)
      }
    ))
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(cssDestDir));
});

gulp.task('build-css', (callback) => {
  runSequence('clean-css','stylus-to-css', 'minify-css', callback)
})

gulp.task('build', (callback) => {
  runSequence('build-css', callback)
})