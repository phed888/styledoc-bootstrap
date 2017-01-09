var
	gulp = require('gulp'),
	sass = require('gulp-sass');

//Source and distribution folders
var
	source = 'src/',
	dest = 'dist/';

//Bootstrap scss source
var bootstrapSass = {
	in: ['./node_modules/bootstrap-sass/']
};

//Bootstrap fonts source
var fonts = {
	in: [source + 'fonts/*.*', bootstrapSass.in + 'assets/fonts/**/*'],
	out: dest + 'fonts/'
};

//Our scss source folder: .scss files
var scss = {
	in: source + 'scss/main.scss',
	out: dest + 'css/',
	watch: source + 'scss/**/*',
	sassOpts: {
		outputStyle: 'nested',
		precision: 3,
		errLogToConsole: true,
		includePaths: [bootstrapSass.in + 'assets/stylesheets']
	}
};

//Copy bootstrap required fonts to dest
gulp.task('fonts', function () {
	return gulp
		.src(fonts.in)
		.pipe(gulp.dest(fonts.out));
});

//Compile Sass
gulp.task('sass', ['fonts'], function () {
	return gulp.src(scss.in)
		.pipe(sass(scss.sassOpts))
		.pipe(gulp.dest(scss.out))
});

//Default task
gulp.task('default', ['sass'], function () {
	gulp.watch(scss.watch, ['sass'])
});



