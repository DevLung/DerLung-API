const app = require("express")();
const PORT = 3000;


app.listen(
    PORT,
    () => console.log(`DerLung-API listening on http://localhost:${PORT}`)
);


app.get(
    "/test",
    (req, res) => {
        res.status(200).send("test response");
    }
);
