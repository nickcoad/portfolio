var gulp = require('gulp');
var cache = require('gulp-cache');
var less = require('gulp-less');
var concat = require('gulp-concat');
var cssNano = require('gulp-cssnano');
var sourcemaps = require('gulp-sourcemaps');
var imagemin = require('gulp-imagemin');
var autoprefixer = require('gulp-autoprefixer');
var uglify = require('gulp-uglify');
var notify = require('gulp-notify');
var del = require('del');

var paths = {
	images: './src/img/**/*',
	scripts: './src/js/**/*.js',
	styles: ['./src/less/style.less', './src/css/**/*.css']
}

gulp.task('styles', function () {
	return gulp.src(paths.styles)
			   .pipe(sourcemaps.init())
			   .pipe(less())
			   .pipe(autoprefixer('last 2 version'))
			   .pipe(cssNano())
			   .pipe(concat('style.css'))
			   .pipe(sourcemaps.write())
			   .pipe(gulp.dest('./dist/assets/css'))
    		   .pipe(notify({ message: 'Styles task complete' }));
});

gulp.task('scripts', function () {
	return gulp.src(paths.scripts)
			   .pipe(sourcemaps.init())
			   .pipe(concat('site.js'))
			   .pipe(uglify())
			   .pipe(sourcemaps.write())
			   .pipe(gulp.dest('./dist/assets/js'));
});

gulp.task('images', function() {
  	return gulp.src(paths.images)
    		   .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    		   .pipe(gulp.dest('dist/assets/img'))
    		   .pipe(notify({ message: 'Images task complete' }));
});

gulp.task('clean', function() {
  	return del(['dist/assets/css', 'dist/assets/js', 'dist/assets/img']);
});

gulp.task('clearCache', function(done) {
  	return cache.clearAll(done);
});

gulp.task('default', ['clean'], function() {
	gulp.start('styles', 'scripts', 'images');
});