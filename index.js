const express = require("express");
const app = express();
const path = require("path");

const PORT = 3000;



app.use(express.static(path.join(__dirname, "/html")))
app.get(
    "/",
    (req, res) => {
        res.status(200).sendFile("./html/index.html")
    }
)

app.get(
    "/test",
    (req, res) => {
        res.status(200).send("test response");
    }
);



app.listen(
    PORT,
    () => console.log(`DerLung-API listening on http://localhost:${PORT}`)
);