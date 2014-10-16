var gulp = require('gulp-help')(
	require('gulp')
);
var less = require('gulp-less');
var sourcemaps = require('gulp-sourcemaps');
var notify = require("gulp-notify");
var plumber = require('gulp-plumber');



// Constants

const PATHS = {
	'dev': {
		'less': './less/'
	},
	'browser': {
		'css': './css/'
	}
};



// Tasks

gulp.task('build-less', "Compiles LESS › CSS", function () {
	gulp.src([
		PATHS.dev.less+'styles.less',
		PATHS.dev.less+'styles-test.less'
	]).pipe(
		plumber({
			errorHandler: notify.onError({ message: 'Error: <%= error.message %>' })
		})
	).pipe(
		sourcemaps.init()
	).pipe(
		notify({ message: "Rebuilt LESS: <%= file.relative %>", emitError: false })
	).pipe(
		less()
	).pipe(
		sourcemaps.write('./')
	).pipe(
		gulp.dest(PATHS.browser.css)
	);
});


gulp.task('watch', "Automatically re-builds changes LESS files", function () {
	gulp.watch(PATHS.dev.less+'**/*.less', ['build-less']);
	gulp.watch(PATHS.browser.css+'non-responsive.css', ['build-less']); // eww
});



// Tasks Aliases

function addGulpTaskAlias(alias, originalTask)
{
	gulp.task(alias, "(alias for `"+originalTask+"`)", [originalTask]);
}

addGulpTaskAlias('less', 'build-less');
