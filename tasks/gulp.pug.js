import gulp from 'gulp';
import pug from 'gulp-pug';
import p from 'pug';
import changed from 'gulp-changed';

let compile = (pugConf, sources, dest) => {
    pugConf.pug = p;
    return () => {
        return gulp.src(sources)
            .pipe(pug(pugConf))
            .pipe(changed(dest, {hasChanged: changed.compareSha1Digest}))
            .pipe(gulp.dest(dest));
    }
};

let from = (config, sources) => ({ to: compile.bind(null, config, sources) })
let set = config => ({ from: from.bind(null, config) })

exports.compile = compile;
exports.set = set;
exports.from = set({}).from;
