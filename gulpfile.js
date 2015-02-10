/*global -$ */
'use strict';
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var eventStream = require('event-stream');


var tsProject = $.typescript.createProject({
    declarationFiles: false,
    noExternalResolve: true,
    sortOutput: true
});

gulp.task('scripts', function() {
    var tsResult = gulp.src('src/scripts/ts/**/*.ts')
        .pipe($.sourcemaps.init()) // This means sourcemaps will be generated
        .pipe($.typescript(tsProject));

    return eventStream.merge( // Merge the two output streams, so this task is finished when the IO of both operations are done.
        tsResult.dts.pipe(gulp.dest('src/scripts/ts/definitions')),
        tsResult.js.pipe(
            $.concat('main.js')) // You can use other plugins that also support gulp-sourcemaps
            .pipe($.sourcemaps.write()) // Now the sourcemaps are added to the .js file
            .pipe(gulp.dest('build/scripts')
        )
    );
});

// styles task, will run when any SCSS files change & BrowserSync
// will auto-update browsers
gulp.task('styles', function () {
    return gulp.src('src/scss/**/*.scss')
        .pipe($.sourcemaps.init())
        .pipe($.sass({
            outputStyle: 'nested', // libsass doesn't support expanded yet
            precision: 10,
            includePaths: ['.'],
            onError: function (err) { notify().write(err); console.error.bind(console, 'Sass error:'+err);}
        }))
        .pipe($.postcss([
            require('autoprefixer-core')({browsers: ['last 2 version']})
         ]))
        .pipe($.sourcemaps.write())
        .pipe(gulp.dest('build/css'))
        .pipe($.filter('scss**/*.css'))
        .pipe(browserSync.reload({stream:true}));
});

gulp.task('jshint', function () {
    return gulp.src('build/scripts/**/*.js')
        .pipe(reload({stream: true, once: true}))
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish'))
        .pipe($.if(!browserSync.active, $.jshint.reporter('fail')));
});


gulp.task('images', function () {
    return gulp.src('src/images/**/*')
        .pipe($.newer('build/'))
        .pipe($.cache($.imagemin({
            progressive: true,
            interlaced: true,
            svgoPlugins: [{removeViewBox: false}]
        })))
        .pipe(gulp.dest('build/images'));
});

gulp.task('fonts', function () {
    return gulp.src('src/fonts/**/*')
        .pipe($.filter('**/*.{eot,svg,ttf,woff}'))
        .pipe(gulp.dest('build/fonts'));
});

gulp.task('extras', function () {
    return gulp.src([
        'src/*.*',
        'src/scripts/vendor/**/*'
    ], {
        base: 'src/',
        dot: true
    }).pipe(gulp.dest('build'));
});

gulp.task('bs-reload', function (){
    browserSync.reload();
});

gulp.task('browser-sync', function(){
    //watch files
    var files = [
        'build/css/**/*.css',
        'build/scripts/**/*js',
        'build/images/**/*',
        'templates/*.tpl.php'
    ];

    return browserSync.init(files, {
        proxy: "http://localhost:8888", //change this to whatever your local development URL is.
        open: false,
        injectChanges: true
    });
});

gulp.task('drush', $.shell.task([
    "cd ~/.kalabox/kalastack/ && vagrant ssh -c 'cd /var/www/winterspringdesserts; drush status; exit;'"
]));

gulp.task('watch',  ['images', 'fonts', 'styles', 'scripts', 'extras', 'browser-sync'],function () {

    gulp.watch('src/scripts/ts/**/*.ts', ['scripts']);
    gulp.watch('src/scss/**/*.scss', ['styles']);
    gulp.watch('images/**/*', ['images']);
    gulp.watch('src/scripts/vendor/**/*', ['extras']);
    gulp.watch('src/fonts/*', ['fonts']);
    //gulp.watch('bower.json', ['wiredep', 'fonts', reload]);
});

gulp.task('clear', function (done) {
    return $.cache.clearAll(done);
});

gulp.task('cleanFonts', require('del').bind(null, ['build/fonts']));


gulp.task('clean', require('del').bind(null, ['.tmp', 'build']));

gulp.task('build', ['images', 'fonts', 'styles', 'scripts', 'extras'], function () {
    return gulp.src('build/**/*').pipe($.size({title: 'build', gzip: true}));
});

gulp.task('default', ['clear', 'clean'], function () {
    gulp.start('build');
});
