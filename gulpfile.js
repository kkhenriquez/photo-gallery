var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');

var del = require('del');
var runSequence = require('run-sequence');


gulp.task('sass', function() {
	return gulp.src('app/scss/**/*.scss')
	.pipe(sass())
	.pipe(gulp.dest('app/css'))
});

gulp.task('watch', ['browserSync', 'sass'], function() {
	gulp.watch('app/scss/**/*.scss', ['sass']);
	gulp.watch('app/*.html', browserSync.reload);
	gulp.watch('app/js/**/*.js', browserSync.reload);
});

gulp.task('browserSync', function() {
	browserSync.init({
		server: {
			baseDir: 'app'
		},
	})
});

gulp.task('useref', function() {
	return gulp.src('app/*.html')
	.pipe(useref())
	.pipe(gulpIf('*.css', cssnano()))
	.pipe(gulp.dest('docs'))
});


gulp.task('views', function() {
	return gulp.src('app/views/*.html')
	.pipe(gulp.dest('docs/views'))
});

gulp.task('scripts', function() {
	return gulp.src('app/js/**/*.js')
	.pipe(gulp.dest('docs/js'))
});

gulp.task('clean:docs', function() {
	return del.sync('docs');
});

gulp.task('build', function (callback) {
	runSequence('clean:docs', ['sass', 'views', 'scripts'], 'useref', callback)
});

gulp.task('default', function (callback) {
	runSequence(['sass', 'browserSync', 'watch'], callback)
});