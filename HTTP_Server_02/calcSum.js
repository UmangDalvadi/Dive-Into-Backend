const express = require("express");
const app = express();
const port = 3000;

function calcSum(n) {
    let count = 0;
    for (let i = 1; i <= n; i++) {
        count += i;
    }
    return count;
}

app.get("/", (req, res) => {
    const n = req.query.n;
    res.send(calcSum(n).toString()); // Make sure responding answer in string is must...
})

app.listen(port);