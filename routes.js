'use strict';

var jwt = require('express-jwt'),
  config = require('config'),
  lib = require('./lib');

module.exports = function(app) {

    //Disabling http header for security reasons
    app.disable('x-powered-by');

    //Including morgan only for no production environments
    if (config.util.getEnv('NODE_ENV') != 'production') {
        app.use(require('morgan')('dev'));
    }

    //use domain middleware (add metadata key for request id on winston log)
    app.use(lib.domain);
    //use request_id middleware, adds X-Request-Id header if it is not present
    //otherwise set the sent X-Request-Id header keeping the value, tracing the request id through different backends on logs
    app.use(lib.request_id);

    //set jwt secret for control authorized request, view config folder
    app.use(
    jwt({
      secret: config.get('jwt.secret'),
      userProperty: 'identity'
    }) //dont check checksystem and login endpoints
      .unless({path: ['/checksystem', '/login']})
    );

    //adding check system endpoint to api
    app.get('/checksystem', lib.checksystem.basic);

    //add login endpoint to api
    app.post('/login', function(req, res){
        res.json({
            token: lib.token.create_token('user',['admin'])
        });
    });

    //add secure resource to api
    app.post('/secure', function(req,res){
        res.json('OK')
    });

    //add throw endpoint to test error handling
    app.get('/throw', function(req,res){
        throw new Error('Server Error');
    });
};
