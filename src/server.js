const express = require("express");
const app = express();
const path = require("path");
const { readFileSync, readFile } = require("fs");
const Ajv = require("ajv");
const ajv = new Ajv();


const PORT = 3000;
const createSmpVersionInfoPath = "../data/CreateSMP_version/version_info.json"
const createSmpVersionInfoSchemaPath = "../data/CreateSMP_version/version_info.schema.json"



app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET');
    next();
});



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
        res.type("text/plain")
        res.status(200).send("test response");
    }
);


const createSmpVersionInfoSchema = JSON.parse(
    readFileSync(path.join(__dirname, createSmpVersionInfoSchemaPath), "utf-8")
);
if (!ajv.validateSchema(createSmpVersionInfoSchema)) {
    throw new Error("Create-SMP version info schema invalid");
}
app.get(
    "/createsmp-version-info/schema",
    (req, res) => {
        res.status(200).send(createSmpVersionInfoSchema);
    }
);


app.get(
    "/createsmp-version-info",
    (req, res) => {
        readFile(path.join(__dirname, createSmpVersionInfoPath), "utf-8", (error, data) => {
            if (error) {
                res.type("application/problem+json")
                res.status(500).send({"message": "unable to fetch version info"});
                return;
            }
            let jsonData = JSON.parse(data);
            if (!ajv.validate(createSmpVersionInfoSchema, jsonData)) {
                res.type("application/problem+json")
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