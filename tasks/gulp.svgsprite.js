import gulp from 'gulp';
import svgSprite from 'gulp-svg-sprite';
import svgmin from 'gulp-svgmin';

let create = (pathSources, namePrefix, spriteName, dest, modes) => {

  return () => {
     return gulp.src(
      '**/*.svg',
      {cwd: pathSources}
    )
    .pipe(svgmin())
    .pipe(svgSprite({
      shape: {
        id: {
          generator: function(symbol) {
            return namePrefix + symbol.replace(".svg", "");
          }
        },
        dest: dest + 'icons/'
      },
      mode: modes
    }))
    .pipe(gulp.dest('./'));
  }
};

let symbol = (pathSources, namePrefix, spriteName, dest) => {

  let mode = {
          dest: dest,
          bust: false,
          sprite: spriteName
        };

  return create(pathSources, namePrefix, spriteName, dest, {symbol:mode});

};

// No tested
let view = (pathSources, namePrefix, spriteName, dest, destStyleScss, templateFileScss) => {

  let mode = {
    dest: dest,
    bust: false,
    sprite: spriteName,
    render: {
      scss: {
        dest: destStyleScss,
        template: templateFileScss
      }
    }
  };

  return create(pathSources, namePrefix, spriteName, dest, {view:mode});
};

exports.create = create;
exports.symbol = symbol;
exports.view = view;