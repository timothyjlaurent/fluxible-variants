'use strict';
//var sqlite3 = require('sqlite3').verbose();  // webpack doesn't like sqlite
//var db = new sqlite3.Database('../db/variant.db');
//var Firebase = require('firebase'); // firebase choked on upload :(
//var variantBase = new Firebase("variantdatastore.firebaseapp.com");
//
var pg = require('pg');
var conString = "postgres://MyMBP@localhost/informatics";


function getGenes(gene, callback){

    pg.connect(conString, function(err, client, done){
        if(err){
            return console.error("error fetching client from pool", err);
        }
        client.query('select * from variants v where "Gene" = $1',
            [gene],
            function(err, result){
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
    name : 'annotation',
    read : function(req, resource, params, config, callback){
        getGenes(params.seed, callback);
    }
}
