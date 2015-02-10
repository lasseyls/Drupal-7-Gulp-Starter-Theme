# Drupal 7 Gulp Starter Theme

Version: 1.0

## Contributors:

Lasse Moos ( [@supermoos](http://twitter.com/supermoos) / [yourlocalstudio.dk](http://www.yourlocalstudio.dk) )

## Summary

Drupal 7 Gulp Starter Theme for use as a starting template for building custom themes. Uses SCSS/SASS (with libsass compiler), HTML5 Boilerplate 5 with Modernizr and Normalize.css, and Gulp for all tasks.

## Usage

The theme is setup to use [Gulp](http://gulpjs.com/) to compile SCSS => CSS, [TypeScript](http://www.typescriptlang.org/) => JavaScript (both with source maps), optimize images, and live browser reload using [BrowserSync](http://www.browsersync.io/), with flexibility to add any additional tasks via the Gulp-file. Alternatively, you can use [CodeKit](http://incident57.com/codekit/) or whatever else you prefer to compile the SCSS and manage the JavaScript.

## What it does:

- Compile SCSS to CSS from `src/scss/style.scss` to `build/css/style.css` and use [Autoprefixer](https://github.com/postcss/autoprefixer) so frameworks like Compass and Bourbon can be mostly avoided.
- Compile TypeScript to JavaScript from `src/scrips/ts/main.ts` to `build/scripts/main.js`
- Minify images and move from `src/images/**/*` to `build/images/**/*`
- Move fonts from `src/fonts/**/*` to `build/fonts/**/*`
- Move vendor JavaScript from `src/scripts/vendor/**/*` to `build/scripts/vendor/**/*`
- Extend with your own tasks...
- Profit

It does not aggregate, concat, minify or anything else fancy with the compiled CSS / JavaScript files because it is preferred to use the [Advanced CSS/JS Aggregation](https://www.drupal.org/project/advagg) module and [Magic](http://drupal.org/project/magic) for this.

## Configuration
Rename folder to your theme name, rename .info file to your theme name, change the `src/scss/style.scss` intro block to your theme information. Open the theme directory in terminal and run `npm install` to pull in all Gulp dependencies. Run `gulp watch` to execute tasks. Code as you will. To optimize images, run `gulp imagemin`. To build for production run `gulp build`

To use BrowserSync you will need to change which local development host you want to be proxied through BrowserSync.
After running `gulp watch` your Terminal will output something like this:
```
[BS] Proxying: http://localhost:8888
[BS] Access URLs:
 --------------------------------------
       Local: http://localhost:3000
    External: http://172.22.33.125:3000
 --------------------------------------
          UI: http://localhost:3001
 UI External: http://172.22.33.125:3001
 --------------------------------------
[BS] Watching files...
```
The default is not to open a browser window because you might find yourself having 10 `http://localhost:3000` tabs open after a while. Instead open one yourself or change the `browser-sync` task defaults in the gulpfile.js around:
```
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
```

### Deployment

TODO

### Features

1. Normalized stylesheet for cross-browser compatibility using [Normalize.css](https://github.com/necolas/normalize.css/) version 3.0.2 (IE8+ only)
2. Easy to customize
3. Flexible grid from [Chris Coyier](https://twitter.com/chriscoyier)
4. Media Queries for mobile and tablets ready to populate
5. Super fast preprocessing using Gulp and [Libsass](https://github.com/sass/libsass) 
6. Super fast browser preview with live css injection using BrowserSync (similar to livereload).
7. Much much more

### Suggested Modules

* [Chaos Tools](http://drupal.org/project/ctools)
* [CKEditor](http://drupal.org/project/ckeditor)
* [Google Analytics](http://drupal.org/project/google_analytics)
* [jQuery Update](http://drupal.org/project/jquery_update)
* [Meta Tags](http://drupal.org/project/metatag)
* [Pathauto](http://drupal.org/project/pathauto)
* [Token](http://drupal.org/project/token)
* [Transliteration](http://drupal.org/project/transliteration)
* [Views](http://drupal.org/project/views)
* [Webform](http://drupal.org/project/webform)
* [Magic](http://drupal.org/project/magic) //Enables removal of default drupal core / contrib JavaScript and CSS files under the [themes settings] (/admin/appearance/settings/gulp_boilerplate).
* [Advanced CSS/JS Aggregation](https://www.drupal.org/project/advagg)
* [Fences](http://drupal.org/project/fences)
* [XML Sitemap](http://drupal.org/project/xmlsitemap)

### Changelog

#### Version 1.0

* initial version

### Credits

Without these projects, this Drupal 7 Gulp Starter Theme wouldn't be where it is today.
* Derived from [Drupal 7 Starter Theme](https://github.com/mattbanks/Drupal-7-Starter-Theme) by Matt Banks ( [@mattbanks](http://twitter.com/mattbanks) / [kernelcreativemedia.com](http://www.kernelcreativemedia.com) / [mattbanks.me](http://www.mattbanks.me) )
* [HTML5 Boilerplate](http://html5boilerplate.com)
* [Normalize.css](http://necolas.github.com/normalize.css)
* [SASS / SCSS](http://sass-lang.com/)
* [Gulp](http://gulpjs.com/)
