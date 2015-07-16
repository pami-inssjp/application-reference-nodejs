var servers = [];

function exitHandler(options, err) {

    if (err) {
        console.error(err.stack);
    }

    var item;

    while(item= servers.shift()) {
        item.cb(item.server);
    }

    if (options.exit) {
        process.nextTick(function(){process.exit();});
    }

    if (options.cleanup) {
        console.info('Terminated');
    }
}

process.on('exit', exitHandler.bind(null, {
    cleanup: true
}));

process.on('SIGTERM', exitHandler.bind(null, {
    exit: true
}));

process.on('SIGINT', exitHandler.bind(null, {
    exit: true
}));

process.on('uncaughtException', function(err) { exitHandler({
    exit: true
}, err)});

module.exports = function(server, cb){
    servers.push({server:server,cb:cb});
};