var gulp = require('gulp-help')(
	require('gulp')
);
var less = require('gulp-less');


// Compiles LESS › CSS 
gulp.task('build-less', function () {
	gulp.src('./less/styles.less').pipe(
		less()
	).pipe(
		gulp.dest('./css/')
	);
});
