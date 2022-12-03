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
        description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laudantium non possimus cum dicta ducimus, nostrum vitae odit reiciendis, voluptatibus sed a animi earum autem facere veritatis rerum qui dolorem exercitationem fuga nemo! Unde ex accusantium possimus in aliquid sed corrupti.",
        location: "Dhangadhi",
        image: 'https://loremflickr.com/1080/720/forest'
    },
    {
        title: "Hotel Royal Century",
        price: 5115,
        description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sequi perferendis eos, suscipit quam tempora est vitae delectus, ipsa labore voluptatibus magni dicta ducimus obcaecati cumque facilis possimus quae? Beatae suscipit consectetur corporis repellat amet, aut eum inventore? Aut necessitatibus reiciendis et? Repellat, architecto veritatis dolorem quisquam aut hic mollitia possimus.",
        location: "Delhi",
        image: 'https://loremflickr.com/1080/720/forest'
    },
    {
        title: "Kathmandu Marriott Hotel",
        price: 31900,
        description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quibusdam atque odit praesentium blanditiis deserunt. Aliquam odit eveniet rem consequatur non! Asperiores recusandae, porro magnam maiores eaque velit debitis dignissimos repellat earum aperiam explicabo rerum adipisci assumenda incidunt nemo amet? Labore impedit voluptates voluptas incidunt tempora vitae eaque, maxime corporis magni placeat sequi, omnis praesentium inventore rerum eius cum aut nisi amet nam. Nam explicabo nihil ullam molestiae ipsum id doloribus facere culpa eum sunt ut aperiam amet, at perferendis? Enim animi nihil repellendus vitae possimus nesciunt temporibus optio aliquid ullam!",
        location: "Lucknow",
        image: 'https://loremflickr.com/1080/720/forest'
    }
]
const seeds = async () => {
    await Campground.deleteMany({})
    await Campground.insertMany(seedCampgrounds)
        .then((res) => {
            console.log(res)
        })
        .catch((e) => {
            console.log(e)
        })
}
seeds()
