const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv/config');
const cors = require('cors');
global.__basedir = __dirname;

const app = express();
const PORT = 8080;
let allowCors = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "http://localhost:3000");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}
app.use(express.static('uploads'));
app.use (bodyParser.json());
app.use(cors());
app.use(allowCors);
app.use(bodyParser.urlencoded({ extended: false }))


const audioRoute = require('./routes/audio');
app.use('/audio', audioRoute);


mongoose.connect (process.env.DB_CONNECTION, { useNewUrlParser: true }, () =>
console.log('Connected to MongoDB!')
);


app.listen(
    PORT,
    () => console.log(`It's live on http://localhost:${PORT}`)
);