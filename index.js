const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override')
const mongoose = require('mongoose');
const Product = require('./models/product')
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
// To view all the products
app.get('/products', async (req, res) => {
    const allProducts = await Product.find({})
    res.render('products/index', { allProducts })
})
// Show form to create a new products
app.get('/products/new', (req, res) => {
    res.render('products/new');
})
// Add new product to database, then redirect
app.post('/products', async (req, res) => {
    const { name, price, category } = req.body
    const newProduct = new Product({ name, price, category })
    await newProduct.save(() => {
        console.log("success")
    })
    console.log(newProduct)
    res.redirect('/products')
})
// To show info about one product
app.get('/products/:id', async (req, res) => {
    const { id } = req.params;
    const foundProduct = await Product.findById(id)
    res.render('products/show', { foundProduct })
})
// Show edit form of one product
app.get('/products/:id/edit', async (req, res) => {
    const { id } = req.params;
    const foundProduct = await Product.findById(id)
    res.render('products/edit', { foundProduct })
})
// Update a particular product, the redirect
app.patch('/products/:id', async (req, res) => {
    const { id } = req.params;
    await Product.findByIdAndUpdate(id, req.body, { runValidators: true })
    res.redirect('/products')
})
// Delete a particular product,then redirect
app.delete('/products/:id', async (req, res) => {
    const { id } = req.params;
    await Product.findByIdAndDelete(id)
    res.redirect('/products')

})
app.listen(3000, () => {
    console.log("app is listening on port 3000")
})