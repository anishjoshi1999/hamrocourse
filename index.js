const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override')
const mongoose = require('mongoose');

// const Product = require('./models/product')
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// override with POST having ?_method=DELETE
app.use(methodOverride('_method'))
mongoose.connect('mongodb://localhost:27017/farmStand')
    .then(() => {
        console.log("connection open")
    })
    .catch((err) => {
        console.log("error found")
        console.log(err)
    })
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')


// Routes
// Select specific university
app.get('/', (req, res) => {
    res.render('new')
})
// Show that specific university
app.post('/', (req, res) => {
    const { university } = req.body
    res.render('show', { university })

})

app.listen(3000, () => {
    console.log("app is listening on port 3000")
})