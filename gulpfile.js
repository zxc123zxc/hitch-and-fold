var gulp = require('gulp'),
	watch = require('gulp-watch'),
	postcss = require('gulp-postcss'),
	htmlInclude = require('gulp-file-include'),
	babel = require('gulp-babel');

var postcssPlugins = [
	require('postcss-import'),
	require('postcss-nested'),
	require('postcss-simple-vars')
];

gulp.task('css', function(){
	gulp.src('./src/css/site.css')
		.pipe(postcss(postcssPlugins))
		.pipe(gulp.dest('./build/css/'));
});

gulp.task('html', function(){
	gulp.src('./src/*.html')
		.pipe(htmlInclude({
			prefix: '@@',
			basepath: '@file'
		}))
		.pipe(gulp.dest('./build/'));
});

gulp.task('fonts', function(){
	gulp.src('./src/fonts/**/*.*')
		.pipe(gulp.dest('./build/fonts/'));
});

gulp.task('js:babel', function(){
	gulp.src('./src/js/*.js')
		.pipe(babel())
		.pipe(gulp.dest('./build/js'));
});

gulp.task('watch', function(){
	gulp.start('css');
	gulp.start('html');
	gulp.start('fonts');
	gulp.start('js:babel');

	watch(['./src/css'], function(event, cb) {
		gulp.start('css');
	});

	watch(['./src/js'], function(event, cb) {
		gulp.start('js:babel');
	});

	watch(['./src/*.html', './src/tmpl_html/*.html'], function(event, cb) {
		gulp.start('html');
	});
});
