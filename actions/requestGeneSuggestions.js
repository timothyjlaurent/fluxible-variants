'use strict';

module.exports = function requestGeneSuggestions(context, payload, done) {


    context.service.read('gene', payload, {}, function(err ,genes){
        if(err||!genes[0]) {
            context.dispatch('AUTOCOMPLETE_FAIL', {});
            done();
            return;
        }

        context.dispatch('AUTOCOMPLETE_SUCCESS', genes);
        done();
    })

};
