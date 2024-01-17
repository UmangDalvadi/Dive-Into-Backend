const { Router } = require("express");
const router = Router();
const { user, todo } = require("../database/db");
const userMiddleware = require('../middleware/user');
const { userValidation, inputTodoValidation, updateTodoValidation } = require('../middleware/validation');
// require('dotenv').config();


router.post('/api/v1/signup', userValidation, async (req, res) => {

    // const username = req.body.username;
    // const password = req.body.password;
    const payload = req.body;
    const isExists = await user.findOne(payload)

    if (!isExists) {
        await user.create(payload);
        res.status(201).json({
            username: payload.username,
            message: 'User created successfully'
        })
    }
    else {
        res.status(403).json({
            message: 'User already signed up'
        })
    }

});

router.post('/api/v1/signin', userValidation, (req, res) => {

});

router.get('/api/v1/todos', userMiddleware, (req, res) => {

});

router.post('/api/v1/todo', userMiddleware, (req, res) => {

});

router.patch('/api/v1/todo/:id', userMiddleware, (req, res) => {

});

router.delete('/api/v1/todo/:id', userMiddleware, (req, res) => {

});

module.exports = router;