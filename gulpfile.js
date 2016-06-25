const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const postcssImport = require('postcss-import');
const postcssNested = require('postcss-nested');
const postcssSimpleVars = require('postcss-simple-vars');

gulp.task('css', () => {
  const processors = [
    postcssImport(),
    postcssNested(),
    postcssSimpleVars(),
    autoprefixer({ browsers: ['last 2 version'] }),
    cssnano(),
  ];

  return gulp.src('./src/css/app.css')
    .pipe(sourcemaps.init())
    .pipe(postcss(processors))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dest'))
    .pipe(browserSync.stream());
});

gulp.task('serve', () => {
  browserSync.init({
    server: './',
    open: false
  });

  gulp.watch('./src/css/**/*.css', ['css']);
  gulp.watch('./index.html').on('change', browserSync.reload);
});

gulp.task('default', ['serve'])
