const express = require('express');
const app = express();
const path = require('path')
const redditData = require('./data.json')
// To work from anywhere
app.use(express.static(path.join(__dirname, 'public')))

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'))

app.get('/', (req, res) => {
    res.render('home')
})
app.get('/cats', (req, res) => {
    const cats = ["Whiskers", "Felix", "Oscar",
        "Smudge",
        "Fluffy",
        "Angel"
    ]
    res.render('cats', { cats })
})
app.get('/r/:subreddit', (req, res) => {
    const { subreddit } = req.params;
    const data = redditData[subreddit]
    if (data) {
        res.render('subreddit', { ...data })
    } else {
        res.send("404 not found")
    }

})

app.get('/random', (req, res) => {
    const num = Math.floor((Math.random() * 10) + 1);

    res.render('random', { num })
})

app.listen(3000, () => {
    console.log("Listening on port 3000");
})