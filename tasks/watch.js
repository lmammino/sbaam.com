import gulp from 'gulp';
import watch from 'gulp-watch';

let standardWatch = src => {
    return tasks => {
        return () => gulp.watch(src, tasks);
    };
};

let gulpWatch = src => {
    return tasks => {
        return () => { watch(src, () => gulp.start(tasks)); }
    };
};

let adv = (src, tasks) => {
    return () => { watch(src, () => gulp.start(tasks)); }
};

let on = sources => ({ to: adv.bind(null, sources) })

module.exports = {
    default: standardWatch,
    advanced: gulpWatch,
    adv: adv,
    on: on
}
