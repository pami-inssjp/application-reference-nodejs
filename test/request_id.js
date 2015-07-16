var
    request = require('supertest'),
    app = require('../app.js');

describe('Check X-Request-Id middleware',function() {

    var token,
        reqId = 'test';

    it('POST /login expect token and X-request-Id', function(done) {
        request(app)
            .post('/login')
            .expect(200, /token/)
            .expect('X-Request-Id',/[\w]{8}(-[\w]{4}){3}-[\w]{12}/)
            .end(function(err, res) {
                if (err) return done(err);
                token = res.body.token;
                reqId = res.get('X-Request-Id');
                done();
            });
    });

    it('GET /secure with X-Request-Id expect same X-Request-Id', function(done) {
        request(app)
            .post('/secure')
            .set('Authorization', 'Bearer ' + token)
            .set('X-Request-Id',reqId)
            .expect(200)
            .expect('X-Request-Id',reqId)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
    });
});