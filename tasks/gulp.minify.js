import gulp from 'gulp';
import minify from 'gulp-minify-css';
import rename from 'gulp-rename';

exports.css = (styleFile, dest, suffix) => {
    return () => {
        gulp.src(styleFile)
            .pipe(minify())
            .pipe(rename({suffix: suffix}))
            .pipe(gulp.dest(dest));
    }
};