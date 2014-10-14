var gulp = require('gulp-help')(
	require('gulp')
);
var less = require('gulp-less');
var sourcemaps = require('gulp-sourcemaps');


const PATHS = {
	'dev': {
		'less': './less/'
	},
	'browser': {
		'css': './css/'
	}
};


gulp.task('build-less', "Compiles LESS › CSS", function () {
	gulp.src(PATHS.dev.less+'styles.less').pipe(
		sourcemaps.init()
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
});


function addGulpTaskAlias(alias, originalTask)
{
	gulp.task(alias, "(alias for `"+originalTask+"`)", [originalTask]);
}

addGulpTaskAlias('less', 'build-less');
