import gulp from 'gulp';
import changed from 'gulp-changed';

let copy = (sources, dest) => {
    return () => {
        return gulp.src(sources)
            .pipe(changed(dest))
            .pipe(gulp.dest(dest));
    }
};

let from = sources => ({ to: copy.bind(null, sources) })

exports.copy = copy;
exports.from = from;