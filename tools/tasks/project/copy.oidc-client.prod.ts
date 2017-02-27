import * as gulp from 'gulp';
import * as gulpLoadPlugins from 'gulp-load-plugins';
import { join, sep, normalize } from 'path';
import * as slash from 'slash';

import Config from '../../config';
import { TemplateLocalsBuilder } from '../../utils';

const plugins = <any>gulpLoadPlugins();

/**
 * Build auth.html injecting oidc-client.min.js
 */
export = () => {
    return gulp.src(join(Config.NPM_BASE, 'oidc-client/lib/oidc-client.min.js'))
        .pipe(gulp.dest(Config.JS_DEST));
};
