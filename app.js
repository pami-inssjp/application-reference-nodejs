'use strict';

var lib = require('./lib'),
    config = require('config'),
    express = require('express');

var app = express();
var server = require('http').createServer(app);

require('./routes')(app);

lib.teardown(server, function(_app){
    console.info('closing server');
    _app.close(function(err){
        if(err){
            return console.error(err);
        }
        console.info('server was closed');
    });
});

// Start server
server.listen(config.port, config.ip, function () {
    console.log('Express server listening on %s:%d, in %s mode',config.ip, config.port, config.util.getEnv('NODE_ENV'));
});

exports = module.exports = app;