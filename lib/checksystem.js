var config = require('config'),
    package = require(process.cwd() +'/package.json');

exports = module.exports = {
    basic: function checksystem(req, res) {
        var status = {
            status: 'OK',
            environment: config.util.getEnv('NODE_ENV') || 'no set',
            version: package.version
        };
        res.send(status);
    }
};