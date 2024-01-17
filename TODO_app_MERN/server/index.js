const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT;

const userRouter = require("./router/user");

app.use(express.json());
app.use('/user', userRouter);

app.listen(port, () => {
    console.log(`server is running on http://localhost:${port}`)
})
