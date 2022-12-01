const express = require('express');
const app = express();
const path = require('path');
const ejsMate = require('ejs-mate')
const methodOverride = require('method-override')
const mongoose = require('mongoose');
var bodyParser = require('body-parser')
// override with POST having ?_method=DELETE
app.use(methodOverride('_method'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.engine('ejs', ejsMate)
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

mongoose.connect('mongodb://localhost:27017/yelp-camp')
    .then(() => {
        console.log("connection open")
    })
    .catch((err) => {
        console.log("error found")
        console.log(err)
    })


// Routes

// showing all the universities
app.get('/', (req, res) => {
    res.render('home')
})
// Showing all the faculties of a specific university
app.get('/:university', (req, res) => {
    const { university } = req.params
    res.render('show_faculties', { university })
})
app.get('/:university/:faculty', (req, res) => {
    //   inside a specific faculty
    const { university, faculty } = req.params
    // rendering duration of a specfic faculty
    res.render('show_duration', { university, faculty })
})
app.get('/:university/:faculty/:duration', (req, res) => {
    //   inside a duration
    const { university, faculty, duration } = req.params
    // Rendering all the courses provided for that specific duration
    res.render('show_courses', { university, faculty, duration })
})
app.get('/:university/:faculty/:duration/:subject', (req, res) => {
    //  Rendering the content of a specific course
    const { university, faculty, duration, subject } = req.params
    res.render('show_content', { university, faculty, duration, subject })
})

app.listen(3000, () => {
    console.log("app is listening on port 3000")
})