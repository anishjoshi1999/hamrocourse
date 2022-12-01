const express = require('express')
const app = express()
const morgan = require('morgan')

app.use(morgan('tiny'))
app.use((req, res, next) => {
    console.log("This is my first middleware")
    return next()

})
app.use((req, res, next) => {
    console.log("This is my second middleware")
    return next()
})
app.get('/', (req, res) => {
    res.send("Home page")
})

app.get('/dogs', (req, res) => {
    res.send("Woof Woof")
})

app.listen(3000, () => {
    console.log("App is running on localhost:3000")
})

