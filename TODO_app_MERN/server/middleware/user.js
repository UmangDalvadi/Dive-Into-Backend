const jwt = require('jsonwebtoken');
require('dotenv').config();
const jwtPassword = process.env.JWT_PASSWORD;

const userMiddleware = (req, res, next) => {

    const bearerToken = req.headers.authorization;
    const bearerTokenArray = bearerToken.split(" ");
    const token = bearerTokenArray[1];

    // console.log(token);
    try {
        const verified = jwt.verify(token, jwtPassword);
        // console.log(verified);

        if (verified) {
            req.username = verified;
            next();
        } else {
            return res.status(401).json({
                message: 'Invalid token. Missing username in the token payload.'
            });
        }
    }
    catch (err) {
        res.status(401).json({
            message: 'Invalid token...',
            Error: err.message
        })
    }
}

module.exports = userMiddleware;