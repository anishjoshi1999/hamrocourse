const mongoose = require('mongoose');
const Campground = require('./models/campground')
mongoose.connect('mongodb://localhost:27017/yelp-camp')
    .then(() => {
        console.log("connection open")
    })
    .catch((err) => {
        console.log("error found")
        console.log(err)
    })

const seedCampgrounds = [
    {
        title: "Devotee",
        price: 12345,
        description: "I love this place",
        location: "Dhangadhi"
    },
    {
        title: "Hotel Royal Century",
        price: 5115,
        description: "Casual hotel with dining and event space",
        location: "Delhi"
    },
    {
        title: "Kathmandu Marriott Hotel",
        price: 31900,
        description: "Upscale hotel with 2 restaurants and a spa",
        location: "Lucknow"
    }
]

Campground.insertMany(seedCampgrounds)
    .then((res) => {
        console.log(res)
    })
    .catch((e) => {
        console.log(e)
    })