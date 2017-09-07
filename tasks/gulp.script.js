import gulp from 'gulp';
import gulpif from 'gulp-if';
import uglify from 'gulp-uglify';

let compile = (minified, sources, dest) => {
    return () => {
        return gulp.src(sources)
            .pipe(gulpif(minified, uglify()))
            .pipe(gulp.dest(dest));
    }
};

let from = (minified, sources) => ({ to: compile.bind(null, minified, sources) })
let set = minified => ({ from: from.bind(null, minified) })

exports.compile = compile;
exports.set = set;
exports.from = set(true).from;