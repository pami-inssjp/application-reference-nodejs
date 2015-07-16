var uuidv4 = require('node-uuid').v4;

module.exports = function(req, res, next) {
    res.set('X-Request-Id',req.get('X-Request-Id') || uuidv4());
    req.requestID = res.get('X-Request-Id');
    return next();
};