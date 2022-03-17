const mongoose = require("mongoose");
const Campground = require("../models/campground");
const cities = require("./cities");
const { descriptors, places } = require("./seedHelpers");
const dbUrl = process.env.DB_URL || "mongodb://localhost:27017/yelp-camp";

main().catch(err => console.log(err));

async function main() {
  // await mongoose.connect('mongodb://localhost:27017/yelp-camp');
  await mongoose.connect(dbUrl);
  console.log("Connected to MongoDB!!!");
};

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 300; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: "6233825f731271fe620177a7",
      // author: "622b24f2d9eefb2acb03bac5",
      // author: "yelp-first-user",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description: "Camping describes a range of activities and approaches to outdoor accommodation. Survivalist and wild campers typically set off with as little as possible to get by. Other campers might use specialised camping gear designed to provide comfort, including their own power and heat sources as well as camping furniture.",
      price,
      geometry: {
        type: "Point",
        // coordinates: [78.46667, 17.36667] // Hyderabad Location
        coordinates: [cities[random1000].longitude, cities[random1000].latitude]
      },
      images: [
        {
          url: 'https://res.cloudinary.com/dh4fcqilv/image/upload/v1647413688/YelpCamp/umq0lzj1tk4o7h69phka.jpg',
          filename: 'YelpCamp/umq0lzj1tk4o7h69phka',
        },
        {
          url: 'https://res.cloudinary.com/dh4fcqilv/image/upload/v1647413691/YelpCamp/s1i39uschp8bqnqkcmdt.jpg',
          filename: 'YelpCamp/s1i39uschp8bqnqkcmdt',
        },
        {
          url: 'https://res.cloudinary.com/dh4fcqilv/image/upload/v1647413691/YelpCamp/jamivlhgvj5cip0sepc8.jpg',
          filename: 'YelpCamp/jamivlhgvj5cip0sepc8',
        },
        {
          url: 'https://res.cloudinary.com/dh4fcqilv/image/upload/v1647413691/YelpCamp/vysjht2rhkuneud7rgab.jpg',
          filename: 'YelpCamp/vysjht2rhkuneud7rgab',
        }
      ]
    })
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});