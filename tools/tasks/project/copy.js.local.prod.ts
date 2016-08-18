import * as gulp from 'gulp';
import * as debug from 'gulp-debug';
import { join } from 'path';

import { JS_DEST, TMP_DIR, PROD_DEST } from '../../config';

/**
 * This sample task should come late in the build chain after the .ts are transpiled into .js under dist/tmp.  
 * It copies from there all JavaScript files under jslocal to the appropiate `dist/dev|prod|test/js` directory, 
 * where other .js artifacts are built.
 */
//export = () => {
//  return gulp.src(join(TMP_DIR, 'jslocal', '**/*.js'))
//    .pipe(debug({title:'copy.js.local'}))
//    .pipe(gulp.dest(JS_DEST));
//};

export = () => {
    let dir=join(TMP_DIR, 'jslocal');
    let serviceWorkerFiles = join(dir, '**/service-worker*.js');
    let normalFiles=[join(dir, '**/*.js'),
                    '!' + serviceWorkerFiles];
    console.log('copy.js.local - normal files: ', normalFiles);
    console.log('copy.js.local - service worker files: ', serviceWorkerFiles);
    gulp.src(normalFiles)
        .pipe(debug({title:'copy.js.local normal files'}))
        .pipe(gulp.dest(JS_DEST));
    gulp.src(serviceWorkerFiles)
        .pipe(debug({title:'copy.js.local service worker files'}))
        .pipe(gulp.dest(PROD_DEST));
};
