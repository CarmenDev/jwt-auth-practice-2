require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const app = express()

app.use(express.json())
app.use(cors())

app.use('/', require('./routes/user'));

mongoose
    .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
      console.log('Connection established');
    })
    .catch(() => {
    console.log('Database connection error')
    });


app.listen(5000, (err) => {
    if (err) throw err;
    console.log('Server started at port 5000');
})