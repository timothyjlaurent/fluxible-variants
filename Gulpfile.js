var gulp = require('gulp')
    , nodemon = require('gulp-nodemon')
    , jshint = require('gulp-jshint')
    , nodeInspector = require('gulp-node-inspector')
    , webpack = require('gulp-webpack')
    , nodeDebug = require('gulp-node-debug')
    , debug = require('gulp-debug')


gulp.task('develop', function () {
    nodemon({
        script: './server.js',
        options: {
            ignore: ['build/**'],
            ext: 'js,jsx',
            nodeArgs : ['--debug']
            }
        })
        .on('change')
        .on('restart', function () {
            console.log('restarted!')
        })
});

gulp.task('debug', function() {
    gulp.src(['./server.js'])
        .pipe(nodeDebug());
});

gulp.task('build', function(){
return gulp.src('client.js')
    .pipe(webpack({
        resolve: {
            extensions: ['', '.js', '.jsx']
        },
        output: {
            publicPath: '/public/js/',
            filename: '[name].js'
        },
        module: {
            loaders: [
                { test: /\.css$/, loader: 'style!css' },
                { test: /\.jsx?$/, loader: 'jsx-loader' },
                { test: /\.json$/, loader: 'json-loader'}
            ]
        },
        stats: {
            colors: true
        },
        devtool: 'source-map',
        watch: true,
        keepalive: true,
        debug: true
    }))
    .pipe(gulp.dest('./build/js'))
});

gulp.task('default', ['build','debug']);
