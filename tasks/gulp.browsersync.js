import gulp from 'gulp';
import browserSync from 'browser-sync';
let bs = browserSync.create();

exports.start = (sources, baseDir) => {
	return () => 
	{
	    bs.init({
	      open: false,
	      notify: false,
	      server: {
	        baseDir: baseDir
	      },
	      ghostMode: {
	        clicks: false,
	        location: false,
	        forms: false,
	        scroll: false
	      }
	    });

	    sources.forEach(entry => {
	      bs.watch(entry).on('change', bs.reload);
	    });
	};
};