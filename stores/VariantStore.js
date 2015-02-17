'use strict';
var createStore = require('fluxible/utils/createStore');
var routesConfig = require('../configs/routes');

var ApplicationStore = createStore({
    storeName: 'VariantStore',
    handlers: {
        'AUTOCOMPLETE_SUCCESS': 'newAutocomplete',
        'AUTOCOMPLETE_FAIL': 'clearAutocomplete',
        'VARIANT_FETCH_FAIL' : 'clearVariants',
        'VARIANT_FETCH_SUCCESS' : 'newVariants'
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
    getFields:  function(){
    return this.fields;

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
        this.autocomplete = payload.rows;
        this.emitChange();
    },
    getAutocomplete : function getAutocomplete(){
        return this.autocomplete;
    },
    newVariants : function newVariants(payload){
        this.variants = payload.rows
        this.emitChange();
    },
    clearVariants : function clearVariants(){
        this.variants = []
        this.emitChange();
    },

    dehydrate: function () {
        return {
            variants : this.variants,
            autocomplete : this.autocomplete
        };
    },
    rehydrate: function (state) {
        this.variants = state.variants,
        this.autocomplete = autocomplete
    }
});

module.exports = ApplicationStore;
