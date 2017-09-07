import fs from 'fs'
import path from 'path'

import gulp from 'gulp'
let use = taskname => require(`./tasks/gulp.${taskname}`)
let createTask = elem => gulp.task.apply(gulp, elem)

//

let getIconsFromFolder = function (path) {
  return fs.readdirSync(path)
        .filter(file => file.substr(-4) === '.svg')
        .map(item => item.slice(0, -4))
}

const icons = getIconsFromFolder(
  path.join(__dirname, 'assets', 'icons')
)

let devOpt = {
  pretty: true,
  locals: {
    prod: false,
    icons
  }
}

let prodOpt = {
  pretty: false,
  locals: {
    prod: true,
    icons
  }
}

//

let sources = {
  scripts: {
    app: './assets/javascripts/**/*.js',
    vendors: []
  },
  views: {
    dev: ['./assets/views/**/*.pug'],
    prod: ['./assets/views/**/*.pug', '!assets/views/**/_*.pug']
  },
  images: './assets/images/**/*.{jpg,png,svg,gif}',
  stylesheets: {
    sass: './assets/sass/**/*.{scss,sass}'
  },
  sync: {
    dev: ['./dev/**/*.*'],
    prod: ['./public/**/*.*']
  },
  icons: {
    dev: './assets/icons/'
  },
	// Package json is included to reload the app when a new package version is detected.
  autoreload: ['gulpfile.babel.js', './tasks/*.js', 'package.json']
}

let devPaths = {
  base: './dev/',
  scripts: 'dev/javascripts/',
  views: 'dev/',
  images: 'dev/images/',
  icons: 'dev/icons-sprite/',
  stylesheets: 'dev/stylesheets/'
}

let prodPaths = {
  base: './public/',
  scripts: 'public/javascripts/',
  views: 'public/',
  images: 'public/images/',
  icons: 'public/icons-sprite/',
  stylesheets: 'public/stylesheets/'
}

let tasks = [
	// --- DEV TASKS ---//

	// -- Browser sync
  ['dev-start-browser-sync', use('browsersync').start(sources.sync.dev, devPaths.base)],

	// -- Icons svg
  ['dev-compile-icons-sprite', use('svgsprite').symbol(sources.icons.dev, 'icon_', 'sprite.svg', devPaths.icons)],
	// ['watch-icons-sprite', use('watch').on([sources.icons.dev]).to(['dev-compile-icons-sprite'])],

	// -- Style
  ['dev-compile-style', use('sass').from(sources.stylesheets.sass).to(devPaths.stylesheets)],
	// -- Style watcher
	['watch-style', use('watch').on([sources.stylesheets.sass]).to(['dev-compile-style'])],

	// -- Views
	['dev-compile-views', use('pug').set(devOpt).from(sources.views.dev).to(devPaths.views)],
	['dev-compile-views-icons', ['dev-compile-icons-sprite', 'dev-compile-views']],

	// -- Views watcher
	['watch-views', use('watch').on(sources.views.dev).to(['dev-compile-views'])],

	// -- Images
	['dev-copy-images', use('copy').from(sources.images).to(devPaths.images)],
	// -- Images watcher
	['watch-images', use('watch').on([sources.images]).to(['dev-copy-images'])],

	// --- PROD TASKS --//

  // -- Browser sync
  ['prod-start-browser-sync', use('browsersync').start(sources.sync.prod, prodPaths.base)],

  // -- Icons svg
  ['prod-copy-svgsprite', ['dev-compile-icons-sprite'], use('copy').from(devPaths.icons).to(prodPaths.icons)],

	// -- Style
	['prod-compile-style', use('sass').from(sources.stylesheets.sass).to(prodPaths.stylesheets)],
	['prod-minify-style', ['prod-compile-style'], use('minify').css('stylesheets/style.css', prodPaths.stylesheets, '.min')],

	// -- Views
	// TODO: need to exclude the doc folder when it compile the view
	['prod-compile-views', use('pug').set(prodOpt).from(sources.views.prod).to(prodPaths.views)],
	['prod-compile-views-icons', ['prod-copy-svgsprite', 'prod-compile-views']],

	// -- Images
	['prod-copy-images', use('copy').from(sources.images).to(prodPaths.images)],

	// --- TASK SEQUENCES ---

    // Dev task
  ['app-dev', [
		// 'watch-icons-sprite',
    'dev-compile-style',
    'watch-style',
    'dev-copy-images',
    'watch-images',
    'dev-compile-views-icons',
    'watch-views',
    'dev-start-browser-sync'
  ]],

    // Prod task
  ['app-prod', [
    'prod-minify-style',
    'prod-copy-images',
    'prod-compile-views-icons'
  ]],

  // Autoreload
  ['start-autoreload', use('autoreload').base(sources.autoreload)],

  // Default task
  ['default', ['app-dev']]
]

tasks.map(createTask)
