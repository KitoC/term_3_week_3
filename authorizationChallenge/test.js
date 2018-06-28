const app = require('./app')

//chai tests
const chai = require('chai')
const should = chai.should()
const chaiHttp = require('chai-http')

chai.use(chaiHttp)


// describe('GET /', () => {
//     // this.timeout(15000)
//     it('should show message', (next) => {
//         chai.request(app)
//             .get('/')
//             .end((err, res) => {
//                 should.equal(err, null)
//                 res.should.have.status(200)
//                 res.text.should.equal('Anyone can view this page')
//                 next()
//             })
//     })
// })


// describe('GET /protected', function () {
//     it('401', function (next) {
//         chai.request(app)
//             .get('/protected')
//             .end((err, res) => {
//                 should.equal(err, null)
//                 res.should.have.status(401)
//                 next()
//             })
//     })
// })

// describe('POST /login', function () {
//     this.timeout(15000)
//     it('Login works', function (next) {
//         chai.request(app)
//             .post('/login')
//             // .set('content-type','application/json')
//             .send({
//                 email: 'admin@admin.com',
//                 password: 'password123'
//             })
//             .end((err, res) => {
//                 should.equal(err, null)
//                 res.should.have.status(200)
//                 res.body.should.have.property('token')
//                 next()
//             })
//     });
// });

describe('POST /protected, after login', function () {
    this.timeout(15000)
    it('Viewing /protected works', function (next) {
        chai.request(app)
            .post('/login')
            // .set('content-type','application/json')
            .send({
                email: 'admin@admin.com',
                password: 'password123'
            })
            .end((err, res) => {
                should.equal(err, null)
                res.should.have.status(200)
                res.body.should.have.property('token')
                next()
            })
    });
});
