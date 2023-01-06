const { Restaurant } = require('../models/restaurant.model');

exports.createRestaurant = async (req, res) => {
    const reqRestaurant = req.body;

    if (Object.keys(reqRestaurant).length == 0) {
        return res.send("Content cannot be empty");
    }
    const restaurant = new Restaurant(reqRestaurant);
    try {
        const savedRestaurant = await restaurant.save();
        return res.status(200).send(savedRestaurant);
    } catch(ex) {
        return res.status(500).send('Some error occurred while creating the Restaurant');
    }
}

exports.getRestaurants = async (req, res) => {
    const successMsg = "Restaurants fetched successfully.";
    try {
        const restaurants = await Restaurant.find();
        console.log(restaurants);
        return res.status(200).send(
            {
                "restaurants": restaurants,
                "message" : successMsg
            });
    } catch (ex) {
        return res.status(500).send('Some error occured while fetching the Restaurants.')
    }
}

exports.getCategories = async (req, res) => {
    try {
        const categories = await Restaurant.find().select("category").distinct("category");
        console.log(categories);
        return res.status(200).send(categories);
    } catch (ex) {
        return res.status(500).send("Some error occurred while fetching Categories");
    }
}

exports.getRestaurantsByCategory = async (req, res) => {
    try {
        const categoryName = "^"+req.params.categoryName+"$";
        console.log(categoryName);
        const restaurants = await Restaurant.find({ category :{'$regex' : categoryName, '$options' : 'i'}})
        res.status(200).send(restaurants);
    } catch (ex) {
        return res.status(500).send("Some error occured while fetching the Restaurant.");
    }
}

exports.getRestaurantById = async (req, res) => {
    try {
        const id = req.params.id;
        console.log(id);
        const restaurant = await Restaurant.findById(id);
        if (restaurant == null || restaurant == undefined) {
            return res.status(404).send(
                {
                    "message" : "No Restaurant found with the given ID"
                }
            )
        }
        return res.status(200).send(restaurant);
    } catch (ex) {
        return res.status(500).send("Some error occured while fetching the Restaurant.");
    }
}

exports.getRestaurantsByRating = async (req, res) => {
    try {
        const rating = req.params.ratingValue;
        console.log(rating);
        const restaurants = await Restaurant.find({rating: { $gte : rating }});
        return res.status(200).send(restaurants);
    } catch (ex) {
        return res.status(500).send("Some error occured while fetching the Restaurant.");
    }
}