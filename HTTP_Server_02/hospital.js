const express = require("express")
const app = express()
const port = 3000

const user = [{
    name: "umang",
    kidney: [{
        healthy: false
    }, {
        healthy: true
    }]
}]

app.get("/", (req, res) => {

})
app.post("/", (req, res) => {

})
app.put("/", (req, res) => {

})
app.delete("/", (req, res) => {

})

app.listen(port);