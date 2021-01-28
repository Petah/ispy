const { src, dest, series, parallel, watch } = require('gulp');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const stripCssComments = require('gulp-strip-css-comments');
const autoprefixer = require('gulp-autoprefixer');
const ts = require('gulp-typescript');
const sourcemaps = require('gulp-sourcemaps');
const browserify = require('browserify');
const buffer = require('vinyl-buffer');
const source = require('vinyl-source-stream');
const log = require('gulplog');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const templateCache = require('gulp-angular-templatecache');

function buildAppScss() {
    return src('scss/app.scss')
        .pipe(sass({
            outputStyle: 'compressed',
        }).on('error', sass.logError))
        .pipe(stripCssComments({
            preserve: false,
        }))
        .pipe(autoprefixer())
        .pipe(rename('app.min.css'))
        .pipe(dest('public/css'));
}

function buildAppTs() {
    const tsProject = ts.createProject('tsconfig.json');
    return tsProject.src()
        .pipe(sourcemaps.init())
        .pipe(tsProject())
        .js
        .pipe(sourcemaps.write())
        .pipe(dest('public/js'));
}

function browserifyAppTs() {
    return browserify({
        entries: './public/js/app.js',
    })
        .bundle()
        .pipe(source('app.js'))
        .on('error', log.error)
        .pipe(dest('./public/js/'));
}

function babelAppTs() {
    return src('./public/js/app.js')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify())
        .pipe(dest('./public/js/'))
}

function templateCacheApp() {
    return src('./templates/**/*.html')
        .pipe(templateCache({
            module: 'App',
        }))
        .pipe(dest('./public/js/'));
}

const buildTs = parallel(series(buildAppTs, browserifyAppTs, babelAppTs));
const buildScss = parallel(buildAppScss);

function watchScss() {
    return watch(['scss/**/*.*'], buildScss);
}

function watchTs() {
    return watch(['ts/**/*.*'], buildTs);
}

function watchTemplates() {
    return watch(['templates/**/*.*'], templateCacheApp);
}

const watchBuild = parallel(watchScss, watchTs, watchTemplates);
const build = parallel(buildScss, buildTs, templateCacheApp);

exports.build = build;
exports.default = build;
exports.watch = series(build, watchBuild);
