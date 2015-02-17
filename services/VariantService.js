'use strict';
//var sqlite3 = require('sqlite3').verbose();  // webpack doesn't like sqlite
//var db = new sqlite3.Database('../db/variant.db');
//var Firebase = require('firebase'); // firebase choked on upload :(
//var variantBase = new Firebase("variantdatastore.firebaseapp.com");
//
var pg = require('pg');
var conString = "postgres://MyMBP@localhost/informatics";


function getVariants(gene, callback){

    pg.connect(conString, function(err, client, done){
        if(err){
            return console.error("error fetching client from pool", err);
        }
        // This creates the regex
//         var qry =  '^' + gene ;
        var queryConfig = {
            text : 'select * from variants where "Gene" = $1 order by "Gene"',
            name: 'variant by gene'
        }

        client.query(queryConfig,
            [gene],
            function(err, result){
                done();
                if(err){
                    callback(err, null);
                }
                callback( null, result );
            }
        )
    })
}

//console.log(getGenes("A"));

module.exports = {
    name : 'variant',
    read : function(req, resource, params, config, callback){
        getVariants(params.gene, callback);
    }
}
