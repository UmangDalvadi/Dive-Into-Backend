const jwt = require('jsonwebtoken');
require('dotenv').config();
const jwtPassword = process.env.JWT_PASSWORD;

const userMiddleware = (req, res, next) => {

    const bearerToken = req.headers.authorization;
    const bearerTokenArray = bearerToken.split(" ");
    const token = bearerTokenArray[1];
    try {
        const verified = jwt.verify(token, jwtPassword);
        if (verified.username) {
            req.username = verified.username;
            next();
        }
    }
    catch (err) {
        res.status(401).json({
            message: 'Invalid token...',
            Error: err
        })
    }
}

module.exports = userMiddleware;