var
    request = require('supertest'),
    app = require('../app.js');

describe('Runnig app',function() {

    it('GET /checksystem expect "status":"OK"', function(done) {
        request(app)
            .get('/checksystem')
            .expect(200, /"status":"OK"/)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
    });
});