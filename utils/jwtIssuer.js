const jsonwebtoken = require('jsonwebtoken');

function jwtIssuer(user){
    const expiresIn = '1d';
    const payload = {
        sub: '',
        iat: Date.now()
    }

    const signedToken = jsonwebtoken.sign(payload, '12345678910');

    return {
        token: 'Bearer',
        signedToken,
        expiresIn
    };
};

module.exports = jwtIssuer;
