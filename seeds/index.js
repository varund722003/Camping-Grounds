const mongoose = require('mongoose');
const cities = require('./cities');
const {places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp')
    .then(() => {
        console.log("Database connected");
    })
    .catch((error) => {
        console.error("Connection error:", error);
    });

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async() => {
    await Campground.deleteMany({});
    for(let i = 0;i<50;i++)
    {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp =  new Campground({
            author: '67cfabf06ad03b43137a2fa6',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            
            description: 'Lorem ipsom',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images: [
                {
                  url: 'https://res.cloudinary.com/dscjqodou/image/upload/v1741693850/Camping-Grounds/rzjdr0xlwacpfaxkzt4q.jpg',
                  filename: 'Camping-Grounds/rzjdr0xlwacpfaxkzt4q',
                 
                },
                {
                  url: 'https://res.cloudinary.com/dscjqodou/image/upload/v1741693849/Camping-Grounds/xkztud2ue6jgusqnh87m.jpg',
                  filename: 'Camping-Grounds/xkztud2ue6jgusqnh87m',
                 
                },
                {
                  url: 'https://res.cloudinary.com/dscjqodou/image/upload/v1741693849/Camping-Grounds/xluy8gwcg2ivgzb5kfrk.jpg',
                  filename: 'Camping-Grounds/xluy8gwcg2ivgzb5kfrk',
                  
                }
              ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})