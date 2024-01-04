const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const { Admin, Course } = require('../db/index');
const jwt = require('jsonwebtoken');
const jwtPassword = process.env.JWT_PASSWORD;

router.post('/signup', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    await Admin.create({
        username: username,
        password: password
    })

    res.json({
        message: 'Admin created successfully'
    })

});

router.post('/signin', (req, res) => {

    const username = req.body.username;
    const password = req.body.passwordd;

    const token = jwt.sign({ username: username }, jwtPassword);

    res.json({
        token: `Bearer ${token}`
    })

});

router.post('/courses', adminMiddleware, async (req, res) => {

    const courses = await Course.create({
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        imageLink: req.body.imageLink
    })

    res.json({
        message: 'Course created successfully',
        courseId: courses._id
    })

});

router.get('/courses', adminMiddleware, (req, res) => {

    Course.find({})
        .then((courses) => {
            if (courses) {
                res.json({
                    courses: courses
                })
            }
            else {
                res.json({
                    message: 'Failed to retrive courses!!'
                })
            }
        })
});

module.exports = router;