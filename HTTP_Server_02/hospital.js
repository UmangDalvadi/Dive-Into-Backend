const express = require("express")
const app = express()
const port = 3000
const bodyParser = require("body-parser");

app.use(bodyParser.json());

const user = [{
    name: "umang",
    kidney: [{
        healthy: false
    }, {
        healthy: false
    }]
}]

app.get("/", (req, res) => {

    const totalKidney = user[0].kidney.length;

    let countHealthyKidney = user[0].kidney.filter((x) => {
        return x.healthy;
    })

    const healthyKidney = countHealthyKidney.length;
    const unHealthyKidney = totalKidney - healthyKidney;

    res.send({ totalKidney, healthyKidney, unHealthyKidney });
})

app.post("/", (req, res) => {

    const isHealthy = req.body.isHealthy;

    user[0].kidney.push({
        healthy: isHealthy
    })

    res.send({});

})

app.put("/", (req, res) => {

    for (let i = 0; i < user[0].kidney.length; i++) {
        if (!user[0].kidney[i].healthy) {
            user[0].kidney[i].healthy = true;
        }
    }

    res.send({})

})

app.delete("/", (req, res) => {

    for (let i = 0; i < user[0].kidney.length; i++) {
        if (!user[0].kidney[i].healthy) {
            user[0].kidney.splice(user[0].kidney[i], 1);
        }
    }

    res.send({});

})

app.listen(port);