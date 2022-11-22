const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override')
const { comments } = require('./data')
let listofcomments = [...comments]
const { v4: uuidv4 } = require('uuid');
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// override with POST having ?_method=DELETE
app.use(methodOverride('_method'))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
// Display all comments
app.get('/comments', (req, res) => {
    res.render("index", { listofcomments })
})
// Form to create new comment
app.get('/comments/new', (req, res) => {
    res.render("new")
})
// Creates new comment on server
app.post('/comments', (req, res) => {
    const id = uuidv4();
    const { username, comment } = req.body
    listofcomments.push({ id, username, comment })
    res.redirect('/comments')
})
// Details for one specific comment
app.get('/comments/:id', (req, res) => {
    const { id } = req.params
    const comment = listofcomments.find((c) => {
        return c.id === id
    })
    res.render('show', { comment })
})
// Form to edit specific comment
app.get('/comments/:id/edit', (req, res) => {
    const { id } = req.params;
    const comment = listofcomments.find((c) => {
        return c.id === id
    })
    res.render('edit', { comment })
})
// Edit specific comment
app.patch('/comments/:id', (req, res) => {
    const { id } = req.params
    const newComment = req.body.comment
    const foundcomment = listofcomments.find((c) => {
        return c.id === id
    })
    foundcomment.comment = newComment
    res.redirect('/comments')
})
// Delete routes
app.delete('/comments/:id', (req, res) => {
    const { id } = req.params;
    listofcomments = listofcomments.filter((element) => {
        if (element.id !== id) {
            return true
        } else {
            return false
        }
    })
    res.redirect('/comments')
})

app.listen(3000, () => {
    console.log("Listening to port 3000")
})