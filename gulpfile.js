// variables setup
var gulp = require('gulp'),
  cleanCSS = require('gulp-clean-css'),
  uglify = require('gulp-uglify'),
  del = require('del'),
  rename = require('gulp-rename'),
  jshint = require('gulp-jshint'),
  plumber = require('gulp-plumber'),
  sass = require('gulp-ruby-sass'),
  concat = require('gulp-concat'),
  connect = require('gulp-connect');

// gulp tasks declaration

gulp.task('style', function() {
	return gulp
	.src('dev/css/*.css')
	.pipe(cleanCSS())
	.pipe(rename({suffix: '.min'}))
	.pipe(gulp.dest('assets/css'))
})

gulp.task('script', function() {
	return gulp
	.src('dev/js/*.js')
	.pipe(plumber())
	.pipe(concat('*.js'))
	.pipe(uglify())
	.pipe(jshint())
	.pipe(rename({suffix: '.min'}))
	.pipe(gulp.dest('assets/js'))
});

gulp.task('sass', function() {
	return sass('dev/scss/*.scss', {style: 'compressed'})
	.pipe(rename({suffix: '.min'}))
	.pipe(gulp.dest('assets/css'))
});

gulp.task('clean', function() {
	del(['assets/css/*.min.css', 'assets/js/*.min.js']).then(paths => {
		console.log('Files and folders that were deleted:\n', paths.join('\n'));
	});
});

// sets up local server on localhost:8080

gulp.task('connect', function() {
	connect.server({
		root: './',
		livereload: true
	});
});

// livereload

gulp.task('live', function() {
	gulp.src('app/*.html')
	.pipe(connect.reload());
});

gulp.task('watch', function() {
	gulp.watch('dev/scss/*.scss', ['sass']);
	gulp.watch('dev/js/*.js', ['script']);
	gulp.watch(['assets/css/*.css', 'app/*.html', 'assets/js/*.min.js'], ['live']);
});

// combined tastks, call 'gulp'	

gulp.task('default', ['clean', 'sass', 'script', 'connect', 'watch']);

// simple testing task
gulp.task('test', ['connect', 'watch']);