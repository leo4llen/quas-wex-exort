const gulp = require('gulp');
const minify_js = require('gulp-uglify');
const minify_css = require('gulp-csso');
const browserSync = require('browser-sync').create();
const rename = require('gulp-rename');
const babelify = require('gulp-babel');
const watch = require('gulp-watch');
const nodemon = require('gulp-nodemon');
const sass = require('gulp-sass');



gulp.task('css', () => {
  return gulp.src('public/stylesheets/style.scss')
            .pipe(sass().on('error', sass.logError))
            .pipe(minify_css())
            .pipe(rename('style.min.css'))
            .pipe(gulp.dest('public/stylesheets'))
})




gulp.task('js', () => {
  return gulp.src('public/javascripts/app.js')
          .pipe(babelify({
            presets: ['es2015']
          }))
          .pipe(minify_js({mangle : true}))
          .pipe(rename('app.min.js'))
          .pipe(gulp.dest('public/javascripts'));
});



gulp.task('browser-sync', ['nodemon'], () => {
	browserSync.init(null, {
		proxy: "http://localhost:3000",
        files: ["public/**/*.*"],
        browser: "chrome.exe",
        port: 1337,
	});
  gulp.watch("public/stylesheets/style.scss", ['css']).on('change', browserSync.reload);

  gulp.watch("public/javascripts/app.js", ['js']).on('change', browserSync.reload);

  gulp.watch("views/**/*.ejs").on('change', browserSync.reload);
});



gulp.task('nodemon',  (cb) => {

	let started = false;

	return nodemon({
    script: 'bin/www',
    ignore : ['public']
	}).on('start',  () => {
		if (!started) {
			cb();
			started = true;
		}
	});
});



gulp.task('build', ['css','js']);

gulp.task('default', ['css',  'js',  'browser-sync']);
