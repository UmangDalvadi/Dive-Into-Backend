const express = require('express')
const app = express()
const cors = require('cors');

app.use(cors());


app.get('/interest', (req, res) => {
    const { profit, rate, year } = req.query;

    const fProfit = parseFloat(profit);
    const fRate = parseFloat(rate);
    const fYear = parseFloat(year);

    const interest = (fProfit * fRate * fYear) / 100;
    const total = fProfit + interest;

    res.json({
        interest: interest,
        total: total
    })
})

app.listen(3000);