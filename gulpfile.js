var gulp = require('gulp')
var sass = require('gulp-sass')
var clean_css = require('gulp-clean-css')
var sourcemaps = require('gulp-sourcemaps')
var browser_sync = require('browser-sync').create()

sass.compiler = require('node-sass')

gulp.task('sass', function() {
	return gulp.src('./css/style.scss')
		.pipe(sourcemaps.init())
		.pipe(sass())
		.pipe(
			clean_css({
				compatibility: 'ie8'
			})
		)
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('./css'))
		.pipe(browser_sync.stream())
})

gulp.task('watch', function() {
	browser_sync.init({
		server: {
			baseDir: './'
		}
	})
	gulp.watch('./css/style.scss', ['sass'])
})

gulp.task('default', ['sass', 'watch'])