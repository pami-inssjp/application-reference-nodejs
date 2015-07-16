var
	config = require('config').get('console'),
	winston = require('winston'),
    util = require('util'),
    fs = require('fs');

var logger = new winston.Logger();
var metadata = {};
var metadata_discover = {};

logger.add(winston.transports.Console, {
  level: 'debug',
  prettyPrint: true,
  colorize: true,
  silent: false,
  timestamp: true
});

if(config.filename){

    var dir = config.folder || 'log';

    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }

  logger.add(winston.transports.DailyRotateFile, {
    filename: dir + '/' + config.filename,
    level: config.levellog,
    datePattern: '.yyyy-MM-dd',
    json: false
  });
}

console.log = function(){
    generic_log_call('debug',arguments);
};
console.info = function(){
    generic_log_call('info',arguments);
};
console.warn = function(){
    generic_log_call('warn',arguments);
};
console.error = function(){
    generic_log_call('error',arguments);
};
console.debug = function(){
    generic_log_call('debug',arguments);
};

console.add_metadata = function(key, value){
    if(typeof value === 'function'){
        metadata_discover[key] = value;
    }
    metadata[key] = value;
};

exports = module.exports = console;

function resolve_metadata(){
    var metadata_discovered = {};
    Object.keys(metadata_discover).forEach(function(key){
        metadata_discovered[key] = metadata_discover[key]();
    });

    return util._extend(metadata,metadata_discovered);
}

function generic_log_call(level, args){
    var args = Array.prototype.slice.call(args);
    args.push(resolve_metadata());
    logger[level].apply(logger, args);
}