'use strict';

module.exports = function (grunt) {
    grunt.initConfig({
        clean: ['build'],
        concurrent: {
            dev: ['nodemon:app', 'webpack:dev'],
            //dev: ['node-inspector', 'webpack:dev'],
            options: {
                logConcurrentOutput: true
            }
        },
        jshint: {
            all: [
                '*.js',
                '{actions,configs,components,services,stores}/**/*.js'
            ],
            options: {
                jshintrc: true
            }
        },
        nodemon: {
            app: {
                script: './server.js',
                options: {
                    ignore: ['build/**'],
                    ext: 'js,jsx',
                    nodeArgs : ['--debug']
                }
            }
        },

        webpack: {
            dev: {
                resolve: {
                    extensions: ['', '.js', '.jsx'],
                    alias : {
                        "kendo": "kendo-ui-webpack"
                    }
                },
                entry: './client.js',
                output: {
                    path: './build/js',
                    publicPath: '/public/js/',
                    filename: '[name].js'
                },
                module: {
                    loaders: [
                        { test: /\.css$/, loader: 'style!css' },
                        { test: /\.js.*$/, loader: 'jsx-loader' },
                        { test: /\.json$/, loader: 'json-loader'},
                        { test: /kendo\-ui\-core[\///].*\.js$/, loader: "imports?jQuery=jquery" }
                    ]
                },
                stats: {
                    colors: true
                },
                devtool: 'source-map',
                watch: true,
                keepalive: true
            }
        }
    });

    // libs
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-webpack');

    // tasks
    //grunt.registerTask('default', ['clean', 'jshint', 'concurrent:dev']);

    grunt.registerTask('default', ['clean', 'concurrent:dev']);
};

