const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const ejsMate = require('ejs-mate')
const dotenv = require("dotenv").config()
var bodyParser = require('body-parser')
const methodOverride = require('method-override')

const Campground = require('./models/campground')
const MONGODB_URI = `mongodb+srv://${process.env.MONGODB_ATLAS_USERNAME}:${process.env.MONGODB_ATLAS_PASSWORD}@cluster0.mfsduzy.mongodb.net/yelp-camp`
mongoose.set('strictQuery', false);
mongoose.connect(MONGODB_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`Serving on port ${process.env.PORT} `)
        })
        console.log("Connected to MongoDB Atlas open")
    })
    .catch((err) => {
        console.log("error found")
        console.log(err)
    })
const app = express()
app.engine('ejs', ejsMate)
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
    res.render('campgrounds/index', { campgrounds })
})
// Show form to make new campground
app.get('/campgrounds/new', (req, res) => {
    res.render('campgrounds/new')
})
// Add a new campground to data base, then redirect
app.post('/campgrounds', async (req, res,next) => {
    try {
        const newCampground = new Campground(req.body)
        await newCampground.save(() => {
            console.log('success')
        })
        res.redirect('/campgrounds')
    } catch (error) {
        next(error)
    }
   
})
// Show info about one campgrounds
app.get('/campgrounds/:id', async (req, res) => {
    const { id } = req.params;
    // Find campground using id
    const foundCampground = await Campground.findById(id)
    res.render('campgrounds/show', { foundCampground })
})
// Show edit form of one campground
app.get('/campgrounds/:id/edit', async (req, res) => {
    const { id } = req.params
    //Find campground using id
    const foundCampground = await Campground.findById(id)
    res.render('campgrounds/edit', { foundCampground })
})
// Update a particular Campground, the redirect
app.patch('/campgrounds/:id', async (req, res) => {
    const { id } = req.params
    await Campground.findByIdAndUpdate(id, req.body)
    res.redirect('/campgrounds')
})
// Delete a particular campground, then redirect
app.delete('/campgrounds/:id', async (req, res,next) => {
        const { id } = req.params;
        await Campground.findByIdAndDelete(id)
        res.redirect('/campgrounds')
})

