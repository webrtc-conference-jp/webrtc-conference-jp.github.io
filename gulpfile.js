var gulp = require("gulp");
var sass = require("gulp-sass");
var autoprefixer = require("gulp-autoprefixer")
var uglify = require("gulp-uglify");
var browser = require("browser-sync");
var plumber = require("gulp-plumber");
var sourcemaps = require('gulp-sourcemaps');
var spawn = require('child_process').spawn;

// 自動更新
gulp.task("server", function() {
    browser({
        server: {
            baseDir: "./_site/"
        }
    });
});

//htmlタスク
gulp.task('html',function(){
  gulp.src('./*.html')          //実行するファイル
    .pipe(plumber())
    .pipe(gulp.dest("./*.html"))
    .pipe(browser.reload({stream:true}))
});

// sass compile
gulp.task("sass", function() {
    gulp.src("./scss/*.scss")
        .pipe(sourcemaps.init())
        .pipe(plumber())
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions', "ie 9"],
            cascade: false
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("./css"))
        .pipe(browser.reload({stream:true}))
});

// jekyll compile
gulp.task('jekyll', function () {
    var jekyll = spawn('jekyll', ['build', '--incremental']);

    jekyll.stdout.on('data', function(data) {
        console.log("" + data);
    });
    jekyll.stderr.on('data', function(data) {
        console.log("" + data);
    });

    jekyll.on('exit', function (code) {
        var message = code ? 'error' : 'success'
        console.log('Finished Jekyll Build : ' + message);
        browser.reload();
    });
});

// gulp監視
gulp.task("default",['server'], function() {
    gulp.watch(['*.html'],['html']);    //htmlファイルを監視
    gulp.watch(['./scss/*.scss'],['sass']); //scssファイルを監視
    gulp.watch(['./css/*.css'],['html']); //cssファイルを監視
    gulp.watch(['./index.html', './session/*.html', './sponsor/*.html', './_data/*.json'],["jekyll"]);
});