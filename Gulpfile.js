var gulp = require('gulp-help')(
	require('gulp')
);
var less = require('gulp-less');
var sourcemaps = require('gulp-sourcemaps');
var notify = require("gulp-notify");
var plumber = require('gulp-plumber');
var _ = require('lodash');



// Constants

const PATHS = {
	'dev': {
		'less': './less/',
		'fonts': './fonts/'
	},
	'browser': {
		'css': './css/'
	}
};



/// Helpers

function prefixEach(strings, prefix) {
	return _.map(strings, function (s) {
		return prefix+s;
	});
}



// Tasks

gulp.task('build-less', "Compiles LESS › CSS", function () {
	gulp.src(
		prefixEach([
			'styles.less',
			'styles-test.less'
		], PATHS.dev.less)
	).pipe(
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
	gulp.watch(PATHS.dev.fonts+'**/*.less', ['build-less']);
});



// Tasks Aliases

function addGulpTaskAlias(alias, originalTask)
{
	gulp.task(alias, "(alias for `"+originalTask+"`)", [originalTask]);
}

addGulpTaskAlias('less', 'build-less');
