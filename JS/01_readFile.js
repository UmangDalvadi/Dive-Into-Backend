const fs = require("fs");

fs.readFile("00_a.txt", "utf-8", function (err, data) {
    console.log(data);
});

console.log("heloo")