const { Router } = require("express");
const router = Router();
const { user, todo } = require("../database/db");
const userMiddleware = require('../middleware/user');
const { userValidation, inputTodoValidation, updateTodoValidation } = require('../middleware/validation');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const jwtPassword = process.env.JWT_PASSWORD;


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

router.post('/api/v1/signin', userValidation, async (req, res) => {

    const payload = req.body;

    const isSignedup = await user.findOne(payload);

    if (isSignedup) {

        const jwtToken = jwt.sign(`${payload.username}`, jwtPassword);
        // localStorage.setItem("jwtToken", jwtToken);
        res.json({
            jwtToken: `bearer ${jwtToken}`
        })

    } else {
        res.status(411).json({
            message: "Incorrect username or password!!"
        });
    }

});

router.post('/api/v1/todo', userMiddleware, inputTodoValidation, async (req, res) => {

    const title = req.body.title;
    const description = req.body.description;

    // console.log("hello")

    const createTodo = await todo.create({
        title: title,
        description: description,
        isDone: false
    })
    // console.log(createTodo)

    await user.updateOne({
        username: req.username
    }, {
        "$push": {
            todos: createTodo._id
        }
    })

    res.status(200).json({
        message: 'post success'
    })

});

router.get('/api/v1/todos', userMiddleware, async (req, res) => {

    const findUser = await user.findOne({
        username: req.username
    });

    const findTodos = await todo.findOne({
        _id: {
            "$in": findUser.todos
        }
    })

    res.status(200).json({
        Todos: findTodos
    })


});

router.patch('/api/v1/todo/:id', userMiddleware, updateTodoValidation, async (req, res) => {

    await todo.updateOne({
        _id: req.params.id
    }, {
        isDone: true
    })

    res.status(200).json({
        message: "Marked as completed"
    })

});

router.delete('/api/v1/todo/:id', userMiddleware, updateTodoValidation, async (req, res) => {

    await todo.deleteOne({
        _id: req.params.id
    })

    await user.updateOne({
        username: req.username
    }, {
        "$pull": {
            todos: req.params.id
        }
    })

    res.json({
        message: "Delete successfully"
    })

});

module.exports = router;