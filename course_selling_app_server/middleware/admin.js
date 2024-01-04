const { Admin } = require('../db/index');
const jwt = require('jsonwebtoken');
const jwtPassword = process.env.JWT_PASSWORD;

function adminMiddleware(req, res, next) {
    
    const bearerToken = req.headers.authorization;
    const bearerTokenArray = bearerToken.split(" ");
    const token = bearerTokenArray[1];
    try {
        const verified = jwt.verify(token, jwtPassword);
        if (verified.username) {
            next();
        }
    } catch (err) {
        res.json({
            message: 'Invalid token'
        })
    }


}

module.exports = adminMiddleware;