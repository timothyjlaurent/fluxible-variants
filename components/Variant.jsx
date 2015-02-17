/** @jsx React.DOM */
'use strict';
var React = require('react');
var ApplicationStore = require('../stores/ApplicationStore');
//var RouterMixin = require('flux-router-component').RouterMixin;
var FluxibleMixin = require('fluxible').Mixin;
var VariantStore = require('../stores/VariantStore')

//Actions
var requestGeneSuggestions = require('../actions/requestGeneSuggestions');
var requestVariants = require('../actions/requestVariants');



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

    onChange: function () {
        this.setState(this.getState());
    },
    handleAutocompleteChange: function(e){
        var val = e.target.value;
        if( val.length>1 ){
            // invoke gene search action
            this.executeAction( requestGeneSuggestions,{
                seed : val
            })
        };
        this.setState({geneSearch : val} );
    },

    searchVariants : function(){
        this.executeAction( requestVariants,{
            gene : this.state.geneSearch
        } )
    },

    render: function () {
        var table ;
        if(this.state.variants.length < 1){
            table =( <h3>No variants found</h3>);
        } else {

            var rows = [];

            for(var i = 0 ; i < this.state.variants.length ; i += 1 ){
                var variant = this.state.variants[i];
                var fields = this.state.fields.map(function (field) {
                    if (field == 'URL') {
                        return ( <td>
                            <a target="_blank" href={variant[field]}>link</a>
                        </td> );
                    }
                    return ( <td>
                        <p>{variant[field]}</p>
                    </td> );
                });

                var row = (<tr key={variant['id']}> {fields} </tr> );

                rows.push(row);
            }
            table = (<table className="table table-hover">
                <tr>
                {this.state.fields.map(function (field) {
                    return <th>{field}</th>;
                })}
                </tr>
                {rows}
            </table>);
        }


        var autoCompleteOptions = this.state.autocomplete.map(function(gene){
            return ( <option key={gene['Gene']} value={gene['Gene']}> { gene['Gene'] }  </option> );
        })


        return (
            <div>
                <div id="gene-input">
                <input className="col-sm-2" value={this.state.geneSearch} onChange={this.handleAutocompleteChange} />
                   <div class="row">
                    <select className="col-sm-2"  onInput={this.handleAutocompleteChange} >
                    {autoCompleteOptions}
                </select>
                      </div>
                    <button onClick={this.searchVariants} className="btn btn-success">Get Variants</button>

                </div>
                {table}

            </div>
        );;
    }

});

module.exports = Application;
