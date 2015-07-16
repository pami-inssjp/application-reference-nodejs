var domain_middleware = require('express-domain-middleware');
var defaultID = domain_middleware.id;

domain_middleware.id = function(req){

    console.add_metadata('X-Request-Id', function(){
        return req.requestID;
    });

    return req.requestID || defaultID();
};

module.exports = domain_middleware;