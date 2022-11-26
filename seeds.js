const mongoose = require('mongoose');
const Product = require('./models/product')
mongoose.connect('mongodb://localhost:27017/farmStand')
    .then(() => {
        console.log("connection open")
    })
    .catch((err) => {
        console.log("error found")
        console.log(err)
    })

// const p = new Product({
//     name: 'Ruby',
//     price: 1.99,
//     category: 'fruit'
// })
// p.save()
//     .then(p => {
//         console.log(p)
//     })
//     .catch(e => {
//         console.log(e)
//     })
const seedProducts = [
    {
        name: "Apples",
        price: 2.99,
        category: 'fruit'
    },
    {
        name: "Tomato",
        price: 0.99,
        category: 'vegetable'
    },
    {
        name: "Potato",
        price: 0.80,
        category: 'vegetable'
    },
    {
        name: "Chocolate Cake",
        price: 4.99,
        category: 'dairy'
    },
    {
        name: "Onions",
        price: 1.50,
        category: 'vegetable'
    },
    {
        name: "Chocolate Milk",
        price: 1.00,
        category: 'dairy'
    }
]
Product.insertMany(seedProducts)
    .then((res) => {
        console.log(res)
    })
    .catch((e) => {
        console.log(e)
    })