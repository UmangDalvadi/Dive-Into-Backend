const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')
require('dotenv').config()
const jwtPassword = process.env.JWT_PASSWORD;
const mongoose = require('mongoose')

mongoose.connect(`mongodb+srv://admin:${process.env.MONGO_PASS}@cluster0.deupiip.mongodb.net/user_app`);

let User = mongoose.model('users', {
    username: String,
    password: String,
    name: String
});

app.use(express.json())

// function userExists(username, password) {

// }

app.post('/signup', async (req, res) => {
    const name = req.body.name;
    const username = req.body.username;
    const password = req.body.password;

    const userInDb = await User.findOne({ username: username });
    if (userInDb) {
        return res.status(400).json({
            msg: 'User already exists, you can signin!'
        })
    }

    const user = new User({
        name: name,
        username: username,
        password: password
    })

    user.save();
    res.status(200).json({
        msg: 'User created'
    })

})

app.post('/signin', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const userInDb = await User.findOne({ username: username })

    if (!userInDb) {
        return res.status(403).json({
            msg: 'User is not in our database, Signup first!'
        })
    }

    const token = jwt.sign({ username: username }, jwtPassword);
    res.status(200).json({
        msg: "Signin successfull",
        token: token
    });

})

app.get('/users', async (req, res) => {
    const token = req.headers.authorization;
    try {
        const decoded = jwt.verify(token, jwtPassword);
        // const username = decoded.username;
        if (!decoded) {
            return res.status(404).json({
                msg: 'Invalid token'
            });
        }

        const data = await User.find({});
        res.status(200).json(data);

    } catch (err) {
        res.status(404).json({
            msg: 'Invalid token'
        });
    }
});

app.listen(process.env.PORT || 3000);