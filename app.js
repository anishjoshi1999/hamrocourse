const express = require('express');
const app = express();
var bodyParser = require('body-parser')
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.get('/', (req, res) => {
    res.send("Welcome")
})
app.get('/tacos', (req, res) => {
    res.send("get request working")
})
app.post('/tacos', (req, res) => {
    console.log(req.body)
    res.send("post request working")
})
app.listen(3000, () => {
    console.log("Listening to port 3000")
})