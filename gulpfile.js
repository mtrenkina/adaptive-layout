const gulp = require("gulp");
const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const less = require("gulp-less");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const csso = require("gulp-csso");
const rename = require("gulp-rename");
const svgstore = require("gulp-svgstore");
const sync = require("browser-sync").create();

// Styles

const styles = () => {
  return gulp
    .src("source/less/style.less")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(less())
    .pipe(postcss([autoprefixer()]))
    .pipe(csso())
    .pipe(rename("styles.min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("source/css"))
    .pipe(sync.stream());
};

exports.styles = styles;

// Server

const server = (done) => {
  sync.init({
    server: {
      baseDir: "source",
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
};

exports.server = server;

// Watcher

const watcher = () => {
  gulp.watch("source/less/**/*.less", gulp.series("styles"));
  gulp.watch("source/less/*.less", gulp.series("styles"));
  gulp.watch("source/*.html").on("change", sync.reload);
  gulp.watch("source/*.js").on("change", sync.reload);
};

const sprite = () => {
  return gulp
    .src("source/img/sprite_icons/icon_*.svg")
    .pipe(svgstore())
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("source/img"));
};

exports.sprite = sprite;

exports.default = gulp.series(styles, server, watcher);
