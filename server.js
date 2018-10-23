// requirements
const express = require("express");
const path = require("path");

//middleware
const bodyParser = require('body-parser');

//setup node_env
let isDev = false;
if (process.env.NODE_ENV.trim() === 'development') {
    require('dotenv').config();
    isDev = true;
}

//express setup
const app = express();
const PORT = process.env.PORT || 3001;

// Requiring our models for syncing
const db = require(path.join(__dirname + '/models'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

//routes
app.use("/api", require("./routes/api.js"));
app.use(express.static(path.join(__dirname, "client")));
app.get("*", function (req, res) {
    res.redirect("/404");
});

db.sequelize.sync({ force: isDev }).then(function () {
    app.listen(PORT, function () {
        console.log("App listening on PORT " + PORT);
    })
});


