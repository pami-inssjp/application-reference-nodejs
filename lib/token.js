var
    jwt = require('jsonwebtoken'),
    config = require('config');

module.exports = {
    create_token: create_token
};

function create_token(user_id, roles) {
    return jwt.sign(
        {roles: roles},
        config.jwt.secret,
        {   subject: user_id,
            expiresInMinutes: config.jwt.timeout}
    );
}