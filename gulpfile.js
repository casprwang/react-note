const gulp = require('gulp');
const babel = require('babelify');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const browserSync = require('browser-sync');
const reload = browserSync.reload;
const historyApiFallback = require('connect-history-api-fallback');
const notify = require('gulp-notify');
const plumber = require('gulp-plumber');


gulp.task('js', () => browserify('src/app.js')
		.transform('babelify', {
  presets: ['es2015', 'react'],
})
		.bundle()
		.on('error', notify.onError({
  message: 'Error: <%= error.message %>',
  title: 'Error in JS 💀',
}))
		.pipe(source('app.js'))
		.pipe(buffer())
		.pipe(gulp.dest('public/'))
		.pipe(reload({ stream: true })));

gulp.task('bs', () => {
  browserSync.init({
    server: {
      baseDir: './',
    },
    notify: {
      styles: {
        top: 'auto',
        bottom: '0',
        left: '0',
        margin: '0px',
        padding: '5px',
        position: 'fixed',
        fontSize: '15px',
        zIndex: '9999',
        borderRadius: '5px 0px 0px',
        color: 'white',
        textAlign: 'center',
        display: 'block',
        backgroundColor: 'rgba(60, 197, 31, 0.498039)',
      },
    },
    middleware: [historyApiFallback()],
  });
});

gulp.task('default', ['js', 'bs'], () => {
  gulp.watch('src/**/*.js', ['js']);
  gulp.watch('./public/style.css', reload);
});
