'use babel';

import gulp from 'gulp'
import runSequence from 'run-sequence'
import cleanCSS from 'gulp-clean-css'
import sourcemaps from 'gulp-sourcemaps'
import rename  from 'gulp-rename';

gulp.task('minify-css', function () {
  return gulp.src(['static/css/*.css','!static/css/*.min.css'])
    .pipe(sourcemaps.init())
    .pipe(cleanCSS(
      {debug: true, inline: 'none'},
      function(details) {
        console.log(details.name + ': ' + details.stats.originalSize
           + " => " + details.stats.minifiedSize);
      }
    ))
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('static/css/'));
});

gulp.task('build', (callback) => {
  runSequence('minify-css', callback)
})