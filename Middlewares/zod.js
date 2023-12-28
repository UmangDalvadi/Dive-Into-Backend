const express = require('express')
const app = express()
const z = require('zod')

app.use(express.json())
const schema = z.array(z.number())

//zod schema for email validation
// eg. 
// {
//     email: string,
//     password: string,
//     country: IND or USA
// }

const schemaUserValidation = z.object({
    email: z.string(),
    password: z.string(),
    country: z.literal('IND').or(z.literal('USA'))
})

app.post('/', (req, res) => {

    const kidney = req.body.kidneys

    const response = schema.safeParse(kidney)
    if (!response.success) {
        res.status(411).json({ msg: 'Invalid input' })
    }
    else {
        res.status(200).json(response.data)
    }
})

app.listen(3000)