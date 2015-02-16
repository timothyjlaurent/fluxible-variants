'use strict';
var createStore = require('fluxible/utils/createStore');
var routesConfig = require('../configs/routes');

var ApplicationStore = createStore({
    storeName: 'VariantStore',
    handlers: {
        'AUTOCOMPLETE_SUCCESS': 'newAutocomplete',
        'AUTOCOMPLETE_FAIL': 'clearAutocomplete'
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
        this.autocomplete = payload.rows.map(function(item){
            return item["Gene"];
        });
        this.emitChange();
    },
    getAutocomplete : function getAutocomplete(){
        return this.autocomplete;
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
