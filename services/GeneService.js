'use strict';


var pg = require('pg');
var conString = "postgres://MyMBP@localhost/informatics";


function getGenes(seed, callback){
    pg.connect(conString, function(err, client, done){
        if(err){
            return console.error("error fetching client from pool", err);
        }
        client.query('select distinct("Gene") from variants v where "Gene" ~* \'^$1\'',
            [seed.seed],
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
    name : 'gene',
    read : function(req, resource, params, config, callback){
        getGenes(params.seed, callback);
    }
}

