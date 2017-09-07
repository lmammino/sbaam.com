import gulp from 'gulp';
import lint from 'gulp-scss-lint';
import cache from 'gulp-cached';

exports.sass = (sources) => {
	return () => {
	    gulp.src(sources)
	        .pipe(cache('scsslint'))
	        .pipe(lint());
	}
};