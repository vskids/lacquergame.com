var gulp = require('gulp-help')(
	require('gulp')
);
var less = require('gulp-less');
var sourcemaps = require('gulp-sourcemaps');


// Compiles LESS › CSS 
gulp.task('build-less', function () {
	gulp.src('./less/styles.less').pipe(
		sourcemaps.init()
	).pipe(
		less()
	).pipe(
		sourcemaps.write('./')
	).pipe(
		gulp.dest('./css/')
	);
});
