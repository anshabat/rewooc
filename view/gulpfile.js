const gulp = require('gulp');
const webpack = require('webpack-stream');
const config = require('./webpack.config.js');
config.watch = true;

gulp.task('js', () => {
    gulp.src('src/app.js')
        .pipe(webpack(config))
        .pipe(gulp.dest('build/'))
});

gulp.task('watch', () => {
    gulp.watch('src/**/*.js', ['js']);
});
