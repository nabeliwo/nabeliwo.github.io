const gulp = require('gulp');
const concat = require('gulp-concat');
const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
const browserSync = require('browser-sync').create();
const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const postcssImport = require('postcss-import');
const postcssNested = require('postcss-nested');
const postcssSimpleVars = require('postcss-simple-vars');

const js = {
  libs: [
    './src/js/libs/jquery-3.0.0.min.js',
    './src/js/libs/jquery.fullPage.min.js',
    './src/js/libs/highlight.pack.js'
  ]
};

gulp.task('concat:libs', () => {
  return gulp.src(js.libs)
    .pipe(concat('libs.js'))
    .pipe(gulp.dest('./dest'));
})

gulp.task('browserify', () => {
  browserify('./src/js/app.js', { debug: true })
    .transform(babelify)
    .bundle()
    .on('error', err => { console.log(`Error : ${err.message}`); })
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./dest'))
    .pipe(browserSync.stream());
});

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
  gulp.watch('./src/js/app.js', ['browserify'])
  gulp.watch('./index.html').on('change', browserSync.reload);
});

gulp.task('default', ['serve'])
