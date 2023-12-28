const express = require('express')
const app = express()
const z = require('zod')

app.use(express.json())

//1) zod schema for kidney input validation
const schema = z.array(z.number())

//2) zod schema for email validation
// eg. 
// {
//     email: string,
//     password: string,
//     country: IND or USA
// }
const schemaUserValidation = z.object({
    email: z.string().email(),
    password: z.string().min(8),
    // country: z.literal('IND').or(z.literal('USA'))  --> hardcore(literal) condition 
    // kidney: z.array(z.number())
})

app.post('/', (req, res) => {

    // const kidney = req.body.kidneys
    // const mail = req.body.mail
    // const password = req.body.password

    const responseInput = schema.safeParse(req.body.kidneys)
    const responseUser = schemaUserValidation.safeParse({
        email: req.body.mail,
        password: req.body.password
    })

    if (!responseInput.success || !responseUser.success) {
        res.status(411).json({ msg: 'Invalid input or user' })
    }
    else {
        res.status(200).json({
            user: responseUser.success,
            data: responseInput.data
        })
    }
})

// we should create single schema for user validate and kidney input validate --> it's good practice

app.listen(3000)