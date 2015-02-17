'use strict';

var React = require('react');
var Fluxible = require('fluxible');
var routrPlugin = require('fluxible-plugin-routr');
var fetchrPlugin = require('fluxible-plugin-fetchr');


// create new fluxible instance
var app = new Fluxible({
    appComponent: React.createFactory(require('./components/Application.jsx'))
});


// add routes to the routr plugin
app.plug(routrPlugin({
    routes: require('./configs/routes')
}));


// add services to app
app.plug(fetchrPlugin({
    xhrPath : '/api'
}));
//


// register stores
app.registerStore(require('./stores/ApplicationStore'));
app.registerStore(require('./stores/VariantStore'));


module.exports = app;
