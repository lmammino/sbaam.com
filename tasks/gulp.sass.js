import gulp from 'gulp';
import sass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import sourcemaps from 'gulp-sourcemaps';
import lint from 'gulp-scss-lint';

let compatibility = ['> 1%', 'last 3 versions', 'Firefox ESR', 'Opera 12.1'];

let parse = (sources, dest) => {
    return () => {
      return gulp.src(sources)
        .pipe(sourcemaps.init())
        .pipe(sass({
          includePaths: ['./node_modules/']
        }).on('error', sass.logError))
        .pipe(autoprefixer({
          browsers: compatibility,
          cascade: false
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(dest));
    }
};

let from = sources => ({ to: parse.bind(null, sources) })

exports.parse = parse;
exports.from = from;