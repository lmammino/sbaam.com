import gulp from 'gulp';
import gutil from 'gulp-util';
import {argv} from 'yargs';
import {spawn} from 'child_process';

exports.base = src => {
    return () => {
        let process;
        let spawnChildren = () => {
            process && process.kill();
            process = spawn('gulp', [argv.task], {stdio: 'inherit'});
        };

        if (!argv.task) {
            gutil.log(gutil.colors.red('ERROR: Tell me witch task you want to run with `--task taskname`'));
            return;
        }

        gulp.watch(src, spawnChildren);
        spawnChildren();
    };
};