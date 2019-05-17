var gulp = require("gulp")
var sass = require("gulp-sass")
var clean_css = require("gulp-clean-css")
var sourcemaps = require("gulp-sourcemaps")
var browser_sync = require("browser-sync").create()

sass.compiler = require("node-sass")

gulp.task("sass", function() {
	return gulp.src("src/css/style.scss")
		.pipe(sourcemaps.init())
		.pipe(sass())
		.pipe(
			clean_css({
				compatibility: "ie8"
			})
		)
		.pipe(sourcemaps.write())
		.pipe(gulp.dest("dist"))
		.pipe(browser_sync.stream())
})

gulp.task("html", function() {
	return gulp.src("src/index.html")
		.pipe(gulp.dest("dist"))
})

gulp.task("fonts", function() {
	return gulp.src("src/fonts/*")
		.pipe(gulp.dest("dist/fonts"))
})

gulp.task("images", function() {
	return gulp.src("src/img/*")
		.pipe(gulp.dest("dist/img"))
})

gulp.task("watch", function() {
	browser_sync.init({
		server: {
			baseDir: "dist"
		}
	})

	gulp.watch("src/index.html", ["html"]).on("change", browser_sync.reload)
	gulp.watch("src/css/style.scss", ["sass"])
	gulp.watch("src/fonts/*", ["fonts"])
	gulp.watch("src/img/*", ["images"])
})

gulp.task("default", ["html", "sass", "fonts", "images", "watch"])