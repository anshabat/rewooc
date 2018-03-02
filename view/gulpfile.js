const gulp = require('gulp');
const webpack = require('webpack-stream');

gulp.task('js', () => {
    gulp.src('src/app.js')
        .pipe(webpack(require('./webpack.config.js')))
        .pipe(gulp.dest('build/'))
});
