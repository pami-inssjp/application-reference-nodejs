var
    request = require('supertest'),
    app = require('../app.js');

describe('Using JWT',function() {

    var token;

    it('POST /secure expect 401', function(done) {
        request(app)
            .post('/secure')
            .expect(401)
            .end(function(err,res) {
                if (err) return done(err);
                done();
            });
    });

    it('POST /login expect token', function(done) {
        request(app)
            .post('/login')
            .expect(200, /token/)
            .end(function(err, res) {
                if (err) return done(err);
                token = res.body.token;
                done();
            });
    });

    it('POST /secure with token expect 200', function(done) {
        request(app)
            .post('/secure')
            .set('Authorization', 'Bearer ' + token)
            .expect(200, /OK/)
            .end(function(err,res) {
                if (err) return done(err);
                done();
            });
    });
});