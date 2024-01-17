const zod = require('zod');

const userSchema = zod.object({
    username: zod.string().email(),
    password: zod.string().min(8)
})

const inputTodoSchema = zod.object({
    title: zod.string(),
    description: zod.string(),
    // isDone: zod.boolean()
})

const updateTodoSchema = zod.object({
    id: zod.string()
})

function userValidation(req, res, next) {

    const payload = req.body;
    const isUserValidate = userSchema.safeParse(payload);
    if (isUserValidate.success) {
        next();
    } else {
        return res.status(401).json({
            message: 'Invalid username or password!',
            require: 'The minimum length of the password should be 8 characters!'
        });
    }

}
function inputTodoValidation() {

}
function updateTodoValidation() {

}

module.exports = {
    userValidation,
    inputTodoValidation,
    updateTodoValidation
}