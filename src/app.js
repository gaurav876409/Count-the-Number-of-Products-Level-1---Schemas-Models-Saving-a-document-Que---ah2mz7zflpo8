const express = require('express');
const app = express();
const mongoose = require('mongoose');
var products = require("../models/product.js");

// Import routes

//Router Middlewares
app.use(express.json());

//Type of query

/*

1. /
2. /?category=phone
3. /?category=laptop --> this means all the product in catgory of laptop
4. /?range=4000-5000 --> this means all the product in the range of 4000-5000
5. /?range=5000  --> this means all the product above 5000
6. /?range=4000-5000&category=laptop --> all the laptop that are in price range 4000-5000

*/


// Complete this Route which will return the count of number of products in the range/

app.get("/", async function (req, res) {

    var count = 0;

    //Write you code here
    //update count variable 
    try {
        const category = req.query.category;
        const range = req.query.range;

        // Create a query object to filter products based on the given category and price range
        const query = {};
        if (category) {
            query.category = category;
        }

        if (range) {
            const priceRange = range.split("-");
            if (priceRange.length === 2) {
                query.price = {
                    $gte: parseInt(priceRange[0]), // Greater than or equal to X
                    $lte: parseInt(priceRange[1]), // Less than or equal to Y
                };
            } else {
                query.price = {
                    $gte: parseInt(priceRange[0]), // Greater than or equal to X
                };
            }
        }

        // Get the count of products that match the query
        const count = await products.countDocuments(query);

        res.send(JSON.stringify(count));
    } catch (err) {
        res.status(500).send("Internal Server Error");
    }

});

module.exports = app;
