//1) checks Auth
//2) and insure input is valid or not (ZOD library used for this functionality)
//if input is invalid then we have to catch it at the end of the server by throughwing error and catch it by globle catches(error handling), for this at the last > app.use(()=>{err, req, res, next}){ }

//defining middleware functionality

const express = require("express")
const app = express()


//wrong way to input validation --> Here zod came to the picture, for this we have to give a structure of our validation to zod and it's internally check all inputes
function userMiddleware(req, res, next) {
    if (req.headers.username != 'umang' || req.headers.password != 'pass') {
        res.status(404).json({
            msg: 'data not found'
        })
    }
    else {
        next()
    }
}

function inputMiddleware(req, res, next) {
    if (req.query.kidneyId != 1 && req.query.kidneyId != 2) {
        res.status(403).json({
            msg: 'Invalid input'
        })
    }
    else {
        next()
    }
}

app.get('/health-check', userMiddleware, inputMiddleware, (req, res) => {
    res.send('Your health is good')
})

app.get('/heart-check', userMiddleware, (req, res) => {
    res.send('your heart is good')
})

app.listen(3000)