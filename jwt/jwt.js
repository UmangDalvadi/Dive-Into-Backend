const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')
const jwtPass = '123456'

const userData = [
    {
        username: 'umang@gmail.com',
        password: '1234',
        name: 'umang'
    },
    {
        username: 'vikash@gmail.com',
        password: '5678',
        name: 'vikash'
    },
    {
        username: 'keval@gmail.com',
        password: '4321',
        name: 'keval'
    }
];

app.use(express.json());

function userExists(username, password) {

    // for (let i = 0; i < userData.length; i++) {
    //     if (userData[i].username == username && userData[i].password == password) {
    //         return true;
    //     }
    // }
    // return false;

    const user = userData.find(user => {
        return user.username == username && user.password == password;
    })
    return !!user // it's a shorthand way to convert result into boolean, is exist than true otherwise false

}

app.post('/signin', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    if (!userExists(username, password)) {
        return res.status(403).json({
            msg: 'user not exists in memory db'
        });
    }

    var token = jwt.sign({ username: username }, jwtPass);
    return res.json({
        token
    });

});

app.get('/users', (req, res) => {

    const token = req.headers.authorization;

    try {
        const decoded = jwt.verify(token, jwtPass);
        const username = decoded.username; //decoded have details about our data which we send when signin

        const returnData = userData.filter((returnData) => {
            return returnData.username == username ? false : true;
        })

        res.status(200).json(returnData);

    } catch (err) {
        return res.status(403).json({
            msg: 'Invalid token'
        });
    }

});

app.listen(process.env.PORT || 3000, (req, res) => {
    console.log('Listening...')
})

