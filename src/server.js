const express = require("express");
const app = express();
const path = require("path");
const { readFileSync, readFile } = require("fs");
const Ajv = require("ajv");
const ajv = new Ajv();


const PORT = 3000;
const createSmpVersionInfoPath = "../data/CreateSMP_version/version_info.json"
const createSmpVersionInfoSchemaPath = "../data/CreateSMP_version/version_info.schema.json"



app.use(express.static(path.join(__dirname, "/html")));
app.get(
    "/",
    (req, res) => {
        res.status(200).sendFile("./html/index.html");
    }
);


app.get(
    "/test",
    (req, res) => {
        res.status(200).send("test response");
    }
);


const createSmpVersionInfoSchema = JSON.parse(
    readFileSync(path.join(__dirname, createSmpVersionInfoSchemaPath), "utf-8")
);
app.get(
    "/createsmp-version",
    (req, res) => {
        readFile(path.join(__dirname, createSmpVersionInfoPath), "utf-8", (error, data) => {
            if (error) {
                res.status(500).send({"message": "unable to fetch version info"});
                return;
            }
            let jsonData = JSON.parse(data);
            if (!ajv.validate(createSmpVersionInfoSchema, jsonData)) {
                res.status(500).send({"message": "version info data is invalid"});
                return;
            }
            res.status(200).send(jsonData);
        });
    }
);



app.listen(
    PORT,
    () => console.log(`DerLung-API listening on http://localhost:${PORT}`)
);