/*global -$ */
'use strict';
// generated on 2015-01-19 using generator-gulp-webapp 0.2.0
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var eventStream = require('event-stream');


/*var tsProject = $.typescript.createProject({
    declarationFiles: false,
    noExternalResolve: true,
    sortOutput: true
});*/

gulp.task('scripts', function() {
    var tsResult = gulp.src('app/scripts/ts/**/*.ts')
        .pipe($.sourcemaps.init()) // This means sourcemaps will be generated
        .pipe($.typescript(tsProject));

    return eventStream.merge( // Merge the two output streams, so this task is finished when the IO of both operations are done.
        tsResult.dts.pipe(gulp.dest('app/scripts/ts/definitions')),
        tsResult.js.pipe($.concat('main.js')) // You can use other plugins that also support gulp-sourcemaps
            .pipe($.sourcemaps.write()) // Now the sourcemaps are added to the .js file
            .pipe(gulp.dest('app/scripts'))
    );
});

gulp.task('styles', function () {
    return gulp.src('assets/scss/style.scss')
        .pipe($.sass({
            outputStyle: 'nested', // libsass doesn't support expanded yet
            precision: 10,
            includePaths: ['.'],
            onError: console.error.bind(console, 'Sass error:')
        }))
        .pipe($.postcss([
            require('autoprefixer-core')({browsers: ['last 2 version']})
        ]))
        .pipe(gulp.dest('build/css'));
});

gulp.task('jshint', function () {
    return gulp.src('app/scripts/**/*.js')
        .pipe(reload({stream: true, once: true}))
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish'))
        .pipe($.if(!browserSync.active, $.jshint.reporter('fail')));
});

gulp.task('html', ['styles', 'scripts'], function () {
    var assets = $.useref.assets({searchPath: ['.tmp', 'app', '.']});

    return gulp.src('app/*.html')
        .pipe(assets)
        .pipe($.if('*.js', $.uglify()))
        .pipe($.if('*.css', $.csso()))
        .pipe(assets.restore())
        .pipe($.useref())
        //.pipe($.if('*.html', $.minifyHtml({conditionals: true, loose: true, empty: true, spare: true, cdata: true, comments: true})))
        .pipe(gulp.dest('dist'));
});

gulp.task('images', function () {
    return gulp.src('assets/images/*')
        .pipe($.cache($.imagemin({
            progressive: true,
            interlaced: true,
            svgoPlugins: [{removeViewBox: false}]
        })))
        .pipe(gulp.dest('assets/images'));
});

gulp.task('fonts', function () {
    return gulp.src(require('main-bower-files')().concat('app/fonts/**/*'))
        .pipe($.filter('**/*.{eot,svg,ttf,woff}'))
        .pipe($.flatten())
        .pipe(gulp.dest('.tmp/fonts'))
        .pipe(gulp.dest('dist/fonts'));
});

gulp.task('extras', function () {
    return gulp.src([
        'app/*.*',
        '!app/*.html',
        'node_modules/apache-server-configs/dist/.htaccess'
    ], {
        dot: true
    }).pipe(gulp.dest('dist'));
});

gulp.task('clean', require('del').bind(null, ['.tmp', 'dist']));

gulp.task('serve',  ['styles'],function () {
    browserSync({
        notify: false,
       // port: 9000,
        proxy: "winterspringdesserts.kala"
    });

    // watch for changes
    gulp.watch([
        'templates/*.tpl.php',
        'style.css',
        'assets/js/**/*.js',
        'assets/images/**/*'
    ]).on('change', reload);

    gulp.watch('app/scripts/ts/**/*.ts', ['scripts']);
    gulp.watch('assets/scss/**/*.scss', ['styles', reload]);
    //gulp.watch('bower.json', ['wiredep', 'fonts', reload]);
});

// inject bower components
gulp.task('wiredep', function () {
    var wiredep = require('wiredep').stream;

    gulp.src('assets/scss/*.scss')
        .pipe(wiredep({
            ignorePath: /^(\.\.\/)+/
        }))
        .pipe(gulp.dest('assets/css'));

/*    gulp.src('app*//*.html')
        .pipe(wiredep({
            ignorePath: /^(\.\.\/)*\.\./
        }))
        .pipe(gulp.dest('app'));*/
});

gulp.task('build', ['html', 'images', 'fonts', 'extras'], function () {
    return gulp.src('dist/**/*').pipe($.size({title: 'build', gzip: true}));
});

gulp.task('default', ['clean'], function () {
    gulp.start('build');
});
