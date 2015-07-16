var
    request = require('supertest'),
    app = require('../app.js');

describe('Runnig app errors',function() {

    var token;

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

    it('GET /secure expect 404 status', function(done) {
        request(app)
            .get('/secure')
            .set('Authorization', 'Bearer ' + token)
            .expect(404)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
    });

    it('GET /throw expect 500 status', function(done) {
        request(app)
            .get('/throw')
            .set('Authorization', 'Bearer ' + token)
            .expect(500)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
    });
});