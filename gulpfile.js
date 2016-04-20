// variables setup
var gulp = require('gulp'),
  cleanCSS = require('gulp-clean-css'),
  del = require('del'),
  rename = require('gulp-rename'),
  jshint = require('gulp-jshint'),
  plumber = require('gulp-plumber'),
  sass = require('gulp-ruby-sass'),
  concat = require('gulp-concat'),
  connect = require('gulp-connect'),
  ngmin = require('gulp-ngmin'),
  autoprefixer = require('gulp-autoprefixer');

// gulp tasks declaration

gulp.task('style', function() {
	return gulp
	.src('dev/css/*.css')
	.pipe(cleanCSS())
	.pipe(rename({suffix: '.min'}))
	.pipe(gulp.dest('app/css'))
})

gulp.task('script', function() {
	return gulp
	.src('dev/js/*.js')
	.pipe(plumber())
	//.pipe(concat('main.js'))
	.pipe(ngmin())
	.pipe(jshint())
	.pipe(rename({suffix: '.min'}))
	.pipe(gulp.dest('app/js/'))
});

gulp.task('sass', function() {
	return sass('dev/scss/*.scss', {style: 'compressed'})
	.pipe(rename({suffix: '.min'}))
	.pipe(gulp.dest('app/css/'))
});


// gulp.task('autoprefixer', function () {
// 	return gulp
// 	.src('dev/scss/*.css')
// 	.pipe(autoprefixer({
// 		browsers: ['last 2 versions'],
// 		cascade: false
// 	}))
// 	.pipe(rename('main.min.css'))
// 	.pipe(gulp.dest('app/css/'));
// });

gulp.task('clean', function() {
	del(['app/css/*.min.css', 'app/js/*.min.js', 'dev/scss/*.min.css']).then(paths => {
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
	//gulp.watch('dev/scss/*.css', ['autoprefixer']);
	gulp.watch(['app/css/*.css', 'app/*.html', 'app/js/*.min.js'], ['live']);
});

// combined tastks, call 'gulp'	

gulp.task('default', ['clean', 'sass', 'script', 'connect', 'watch']);

// simple testing task
gulp.task('test', ['connect', 'watch']);