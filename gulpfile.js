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
			baseDir: 'dist'
		},
	})
});

gulp.task('useref', function() {
	return gulp.src('app/*.html')
	.pipe(useref())
	.pipe(gulpIf('*.css', cssnano()))
	.pipe(gulp.dest('dist'))
});


gulp.task('views', function() {
	return gulp.src('app/views/*.html')
	.pipe(gulp.dest('dist/views'))
});

gulp.task('scripts', function() {
	return gulp.src('app/js/**/*.js')
	.pipe(gulp.dest('dist/js'))
});

gulp.task('clean:dist', function() {
	return del.sync('dist');
});

gulp.task('build', function (callback) {
	runSequence('clean:dist', ['sass', 'views', 'scripts'], 'useref', callback)
});

gulp.task('default', function (callback) {
	runSequence(['sass', 'browserSync', 'watch'], callback)
});