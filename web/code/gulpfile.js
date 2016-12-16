var gulp     = require("gulp");
var plumber  = require("gulp-plumber");
// var queue    = require("streamqueue");
// var bower    = require("main-bower-files");
// var concat   = require("gulp-concat");
// var uglify   = require("gulp-uglify");
// var minify   = require("gulp-minify-css");
var changed = require('gulp-changed');

var del = require("del");

var paths = {
  "source": {
    "root": "./plugins/http/assets/",
    "js": "./plugins/http/assets/js/",
    "lib": "./plugins/http/assets/js/lib/",
    "css": "./plugins/http/assets/css/",
    "fonts": "./plugins/http/assets/fonts/",
    "images": "./plugins/http/assets/images/",
    "uploadFile": "./plugins/http/assets/upload_file/",
    "downloadFile": "./plugins/http/assets/download_files/"
  },
  "destination": {
    "root": "./plugins/http/public/",
    "js": "./plugins/http/public/js/",
    "css": "./plugins/http/public/css/",
    "fonts": "./plugins/http/public/fonts/",
    "images": "./plugins/http/public/images",
    "uploadFile": "./plugins/http/public/upload_file/",
    "downloadFile": "./plugins/http/public/download_files/"
  }
};

// gulp.task("default", ["bower", "fonts", "images", "bundle","html"]);
gulp.task("default", ["css", "fonts", "images", "js","uploadFile","downloadFile"]);

gulp.task("clean", function () {

  del(["public"]);

});

gulp.task("fonts", function () {

  var destination = gulp.dest(paths.destination.fonts);

  gulp.src(paths.source.fonts + "**/*")
    .pipe(plumber())
    .pipe(destination);

});
gulp.task("js", function () {

  var destination = gulp.dest(paths.destination.js);

  gulp.src(paths.source.js + "**/*.js")
    .pipe(plumber())
    .pipe(destination);

});
gulp.task("css", function () {

  var destination = gulp.dest(paths.destination.css);

  gulp.src(paths.source.css + "**/*.css")
    .pipe(plumber())
    .pipe(destination);

});
gulp.task("images", function() {

  var destination = gulp.dest(paths.destination.images);

  gulp.src(paths.source.images + "**/*.*")
    .pipe(plumber())
    .pipe(changed(paths.destination.images))
    //.pipe(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true }))
    .pipe(destination);

});
gulp.task("uploadFile", function () {

  var destination = gulp.dest(paths.destination.uploadFile);

  gulp.src(paths.source.uploadFile + "**/*.xlsx")
    .pipe(plumber())
    .pipe(destination);

});

gulp.task("downloadFile", function () {

  var destination = gulp.dest(paths.destination.downloadFile);

  gulp.src(paths.source.downloadFile + "**/*.*")
    .pipe(plumber())
    .pipe(destination);

});

gulp.task("bower", function () {

  var jsFiles = bower("**/*.js");
  var cssFiles = bower("**/*.css");
  var fontFiles = bower(["**/*.eot", "**/*.svg", "**/*.ttf", "**/*.woff", "**/*.woff2"]);

  var jsDestination = gulp.dest(paths.destination.js);
  var cssDestination = gulp.dest(paths.destination.css);
  var fontDestination = gulp.dest(paths.destination.fonts);

  // js
  queue({ objectMode: true }
    , gulp.src(jsFiles)
    , gulp.src(paths.source.lib + "jquery-sizzle.js")
    , gulp.src(paths.source.lib + "menu.js")
    , gulp.src(paths.source.lib + "modernizr.js")
    )
    .pipe(plumber())
    .pipe(concat("core.js"))
    .pipe(uglify())
    .pipe(jsDestination);

  // css
  queue({ objectMode: true }
    , gulp.src(cssFiles)
    , gulp.src(paths.source.css + "**/*.css")
    )
    .pipe(plumber())
    .pipe(concat("core.css"))
    .pipe(minify())
    .pipe(cssDestination);

  // fonts
  gulp
    .src(fontFiles)
    .pipe(plumber())
    .pipe(fontDestination);

});

gulp.task("bundle", function () {

  // var jsFiles = bower(paths.source.root + "bulder.js");
  // console.log(paths.source.js + "bulder.js");
  var jsDestination = gulp.dest(paths.destination.js);

    // js
  queue({ objectMode: true }
    , gulp.src(paths.source.js + "bundle.js")
    )
    .pipe(plumber())
    .pipe(jsDestination);

});

gulp.task("html", function () {

  var htmlDestination = gulp.dest(paths.destination.root);

  queue({ objectMode: true }
    , gulp.src(paths.source.root + "index.html")
    )
    .pipe(plumber())
    .pipe(htmlDestination);

});
