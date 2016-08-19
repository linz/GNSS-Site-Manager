import * as gulp from 'gulp';
import * as debug from 'gulp-debug';
import * as gulpif from 'gulp-if';
import { join } from 'path';
import { argv } from 'yargs';
import { JS_DEST, DEV_DEST } from '../../config';

/**
 * This sample task should come late in the build chain after the .ts are transpiled into .js under dist/tmp.  
 * It copies from there all JavaScript files under jslocal to the appropiate `dist/dev|prod|test/js` directory, 
 * where other .js artifacts are built.
 *
 * EXCEPT for Service Worker javascript since due to restrictions it needs to be in the root of the site (it
 * applies to all content under /).  So anything that starts with 'service-worker' will be moved to the root.
 */
export = () => {
    let dir=join(DEV_DEST, 'jslocal');
    let serviceWorkerFiles = join(dir, '**/service-worker*.js');
    let normalFiles=[join(dir, '**/*.js'),
                    '!' + serviceWorkerFiles];

    let debugout = argv.debug;
    if (debugout) {
        console.log("DEBUGx IS TRUE");
        console.log('copy.js.local - normal files: ', normalFiles);
        console.log('copy.js.local - service worker files: ', serviceWorkerFiles);
    } else {
        console.log("DEBUGx is FALSE");
    }
    gulp.src(normalFiles)
        .pipe(gulpif(debugout, debug({title:'copy.js.local normal files'})))
        .pipe(gulp.dest(JS_DEST));
    gulp.src(serviceWorkerFiles)
        .pipe(gulpif(debugout, debug({title:'copy.js.local service worker files'})))
        .pipe(gulp.dest(DEV_DEST));
};
