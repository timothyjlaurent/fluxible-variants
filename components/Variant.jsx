/** @jsx React.DOM */
'use strict';
var React = require('react');
var ApplicationStore = require('../stores/ApplicationStore');
var RouterMixin = require('flux-router-component').RouterMixin;
var FluxibleMixin = require('fluxible').Mixin;
var VariantStore = require('../stores/VariantStore')
var requestGeneSuggestions = require('../actions/requestGeneSuggestions');
//var Typeahead = require('./Typeahead.jsx');
//var autoComplete = require('kendo-ui-webpack/kendo.ui.AutoComplete.js');

//var Autocomplete = require('react-autocomplete');
////var Combobox = require('./lib/Combobox');
//var Option = require('./lib/Option');

var Application = React.createClass({
    mixins: [ FluxibleMixin],
    statics: {
        storeListeners: [ VariantStore ]
    },
    getInitialState: function () {
        return this.getState();
    },
    getState: function () {
        var variantStore = this.getStore(VariantStore);
        return {
            autocomplete: variantStore.getAutocomplete(),
            variants: variantStore.getVariants(),
            fields : variantStore.fields
        };
    },


    //renderComboboxOptions : function(){
    //  return this.genes.map(function(gene){
    //      return(
    //          <ComboboxOption
    //              key={gene.gene}
    //              value={gene.gene}
    //          >{gene.gene}</ComboboxOption>
    //      );
    //
    //  });
    //},

    onChange: function () {
        this.setState(this.getState());
    },
    handleAutocompleteChange: function(e){
        var val = e.target.value;
        if( val.length>1 ){
            //todo invoke gene search action
            this.executeAction(requestGeneSuggestions,{
                seed : val
            })
        };
        this.setState({geneSearch : val} );
    },
    render: function () {
        var table ;
        if(this.state.variants.length < 1){
            table = <h3>No variants found</h3>;
        } else {
            table = (<table className="table table-hover">
                <tr>
                {this.fields.map(function (field) {
                    return <th>{field}</th>;
                })}
                </tr>
            </table>);
        }
        //    {this.state.variants.map(function(variant){
        //        return ({this.fields.map(function(field){
        //            if ( field === 'URL' ) {
        //                return <td><a href="{variant.URL}">link</a></td>;
        //            }
        //            return <td>{variant[field]}</td>;
        //        })})
        //    })}
        //);
        //var menuContent = this.
        return (
            <div>
                <div id="gene-input">
                <input class="typeahead" value={this.state.geneSearch} onChange={this.handleAutocompleteChange} />
                </div>
                {table}

            </div>
        );;
    },
    componentDidMount : function() {
        $('#gene-input .typeahead').typeahead({
            hint : true,
            highlight:true,
            minLength : 2
        },
        {
        })
    }



    //componentDidUpdate: function(prevProps, prevState) {
    //    var newState = this.state;
    //    if (newState.pageTitle === prevState.pageTitle) {
    //        return;
    //    }
    //    document.title = newState.pageTitle;
    //}
});

module.exports = Application;
