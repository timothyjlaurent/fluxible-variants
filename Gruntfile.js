'use strict';

module.exports = function (grunt) {
    grunt.initConfig({
        clean: ['build'],
        concurrent: {
            dev: ['nodemon:app', 'webpack:dev', 'node-inspector:dev'],
            //dev: ['node-inspector', 'webpack:dev'],
            options: {
                logConcurrentOutput: true
            }
        },

        'node-inspector': {
            dev: {
                options: {
                    'save-live-edit' : true
                }
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
                        { test: /react\-autocomplete/, loader: 'jsx-loader' },
                        { test: /\.jsx?$/, loader: 'jsx-loader' },
                        { test: /\.json$/, loader: 'json-loader'},
                        { test: /kendo\-ui\-core[\///].*\.js$/, loader: "imports?jQuery=jquery" }
                    ]
                },
                stats: {
                    colors: true
                },
                devtool: 'source-map',
                watch: true,
                keepalive: true,
                debug: true
            }
        }
    });

    // libs
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-webpack');
    grunt.loadNpmTasks('grunt-node-inspector');

    // tasks
    //grunt.registerTask('default', ['clean', 'jshint', 'concurrent:dev']);

    grunt.registerTask('default', ['clean', 'concurrent:dev']);
};

