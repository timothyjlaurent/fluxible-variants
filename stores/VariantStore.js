'use strict';
var createStore = require('fluxible/utils/createStore');
var routesConfig = require('../configs/routes');

var ApplicationStore = createStore({
    storeName: 'VariantStore',
    handlers: {
        'AUTOCOMPLETE_SUCCESS': 'newAutocomplete',
        'AUTOCOMPLETE_FAIL': 'clearAutocomlete'
    },
    fields:[
    'Gene',
    'Nucleotide Change',
    'Protein Change',
    'Other Mappings',
    'Alias',
    'Transcripts',
    'Region',
    'Reported Classification',
    'Inferred Classification',
    'Source',
    'Last Evaluated',
    'Last Updated',
    'URL',
    'Submitter Comment'
    ],
    getVariants : function(){
        return this.variants;
    },
    initialize: function () {
        this.variants = [];
        this.autocomplete = [];
    },
    clearAutocomplete : function clearAutocomplete(){
        this.autocomplete = [];
        this.emitChange();
    },
    newAutocomplete: function newAutocomplete(payload){
        this.autocomplete = payload;
        this.emitChange();
    },
    getAutocomplete : function getAutocomplete(){
        return this.autocomplete;
    },
    //handleNavigate: function (route) {
    //    if (this.currentRoute && (this.currentRoute.url === route.url)) {
    //        return;
    //    }
    //
    //    var pageName = route.config.page;
    //    var page = this.pages[pageName];
    //
    //    this.currentPageName = pageName;
    //    this.currentPage = page;
    //    this.currentRoute = route;
    //    this.emitChange();
    //},
    //getCurrentPageName: function () {
    //    return this.currentPageName;
    //},
    //getPageTitle: function () {
    //    return this.pageTitle;
    //},
    //getCurrentRoute: function () {
    //    return this.currentRoute;
    //},
    //getPages: function () {
    //    return this.pages;
    //},
    dehydrate: function () {
        return {
            //currentPageName: this.currentPageName,
            //currentPage: this.currentPage,
            //pages: this.pages,
            //route: this.currentRoute,
            //pageTitle: this.pageTitle
            variants : this.variants,
            autocomplete : this.autocomplete
        };
    },
    rehydrate: function (state) {
        //this.currentPageName = state.currentPageName;
        //this.currentPage = state.currentPage;
        //this.pages = state.pages;
        //this.currentRoute = state.route;
        //this.pageTitle = state.pageTitle;
        this.variants = state.variants,
        this.autocomplete = autocomplete
    }
});

module.exports = ApplicationStore;
