'use strict';


var pg = require('pg');
var conString = "postgres://MyMBP@localhost/informatics";


function getGenes(seed, callback){
    pg.connect(conString, function(err, client, done){
        if(err){
            return console.error("error fetching client from pool", err);
        }

        // This creates the regex
        var qry =  '^' + seed ;

        var queryConfig = {
            text : 'select distinct("Gene") from variants where "Gene" ~* $1 order by "Gene"',
            name: 'variant gene starts with'
        }

        client.query(queryConfig,
            [qry],
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
    name : 'gene',
    read : function(req, resource, params, config, callback){
        getGenes(params.seed, callback);
    }
}

