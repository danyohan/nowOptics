import express from "express";
const app = express();
const path = require('path');

app.set("view engine", "ejs");

app.set('views', path.join(__dirname, '/public/views'));
app.use(express.static(__dirname + "/public"));

export default app;
