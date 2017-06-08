import * as gulp from 'gulp';
import { join } from 'path';
import Config from '../../config';

/**
 * Build auth.html injecting oidc-client.min.js
 */
export = () => {
    return gulp.src(join(Config.NPM_BASE, 'oidc-client/lib/oidc-client.min.js'))
        .pipe(gulp.dest(Config.JS_DEST));
};
