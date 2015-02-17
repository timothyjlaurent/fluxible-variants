'use strict';

module.exports = function requestGeneSuggestions(context, payload, done) {


    context.service.read('variant', payload, {}, function(err ,data){
        if(err||!data["rows"][0]) {
            context.dispatch('VARIANT_FETCH_FAIL', {});
            done();
            return;
        }

        context.dispatch('VARIANT_FETCH_SUCCESS', data);
        done();
    })

};
