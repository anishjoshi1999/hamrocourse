const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
var bodyParser = require('body-parser')
const methodOverride = require('method-override')

const Campground = require('./models/campground')
mongoose.connect('mongodb://localhost:27017/yelp-camp')
    .then(() => {
        console.log("connection open")
    })
    .catch((err) => {
        console.log("error found")
        console.log(err)
    })
const app = express()
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// override with POST having ?_method=DELETE
app.use(methodOverride('_method'))

app.get('/', (req, res) => {
    res.render('home')
})
// Display a list of all campgrounds
app.get('/campgrounds', async (req, res) => {
    const campgrounds = await Campground.find({})
    res.render('index', { campgrounds })
})
// Show form to make new campground
app.get('/campgrounds/new', (req, res) => {
    res.render('new')
})
// Add a new campground to data base, then redirect
app.post('/campgrounds', async (req, res) => {
    const newCampground = new Campground(req.body)
    await newCampground.save(() => {
        console.log('success')
    })
    res.redirect('/campgrounds')
})
// Show info about one campgrounds
app.get('/campgrounds/:id', async (req, res) => {
    const { id } = req.params;
    // Find campground using id
    const foundCampground = await Campground.findById(id)
    res.render('show', { foundCampground })
})
// Show edit form of one campground
app.get('/campgrounds/:id/edit', async (req, res) => {
    const { id } = req.params
    //Find campground using id
    const foundCampground = await Campground.findById(id)
    res.render('edit', { foundCampground })
})
// Update a particular Campground, the redirect
app.patch('/campgrounds/:id', async (req, res) => {
    const { id } = req.params
    await Campground.findByIdAndUpdate(id, req.body)
    res.redirect('/campgrounds')
})
// Delete a particular campground, then redirect
app.delete('/campgrounds/:id', async (req, res) => {
    const { id } = req.params;
    await Campground.findByIdAndDelete(id)
    res.redirect('/campgrounds')
})

app.listen(3000, () => {
    console.log("Serving on port 3000")
})