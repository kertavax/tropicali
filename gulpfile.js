var gulp = require('gulp')
var sass = require('gulp-sass')
sass.compiler = require('node-sass')

gulp.task('default', function() {
	// we want to run sass 'css/style.scss style.css'
	return gulp.src('./css/style.scss')
		.pipe(sass())
		.pipe(gulp.dest('./css'))
})