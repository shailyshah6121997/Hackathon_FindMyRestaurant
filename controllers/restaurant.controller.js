const { Restaurant } = require('../models/restaurant.model');
const restaurantRoutes = require('../routes/restaurant.routes');

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
        return res.status(200).send(categories);
    } catch (ex) {
        return res.status(500).send("Some error occurred while fetching Categories");
    }
}

exports.getRestaurantsByCategory = async (req, res) => {
    try {
        const categoryName = "^"+req.params.categoryName+"$";
        const restaurants = await Restaurant.find({ category :{'$regex' : categoryName, '$options' : 'i'}})
        res.status(200).send(restaurants);
    } catch (ex) {
        return res.status(500).send("Some error occured while fetching the Restaurant.");
    }
}

exports.getRestaurantById = async (req, res) => {
    try {
        const id = req.params.id;
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
        const restaurants = await Restaurant.find({rating: { $gte : rating }});
        return res.status(200).send(restaurants);
    } catch (ex) {
        return res.status(500).send("Some error occured while fetching the Restaurant.");
    }
}

exports.updateRestaurantById = async (req, res) => {
    try {
        const id = req.params.id;
        const updateParams = req.body;
        const retaurantKeys = Object.keys(Restaurant.prototype);
        const keysParam = Object.keys(updateParams);

        for (p of keysParam) {
            if (!retaurantKeys.includes(p)) {
                return res.status(400).send({
                    "message": "Restaurant Data is required."
                });
            }
        }

        const restaurant = await Restaurant.findByIdAndUpdate(id, updateParams);
        if (restaurant == null || restaurant == undefined) {
            return res.status(200).send({
                "message": "No Restaurant found for given ID."
            });
        }
        else {
            return res.status(200).send({
                "message": "Restaurant updated successfully."
            });
        }
    } catch (ex) {
        return res.status(500).send("Some error occured while fetching the Restaurant.");
    }
}

exports.deleteRestaurantById = async (req, res) => {
    const id = req.params.id;
    try {
        console.log(id);
        const restaurant = await Restaurant.findByIdAndDelete(id);
        return res.status(200).send({
            "restaurant" : restaurant,
            "message": "Restaurant deleted successfully."
        });
    } catch (ex) {
        res.status(500).send("Some error occured while deleting the Restaurant.");
    }
}

exports.deleteAllRestaurants = async (req, res) => {
    try {
        const result = await Restaurant.deleteMany();
        console.log(result);
        return res.status(200).send({
            "restaurants" : result,
            "message": "Restaurants deleted successfully."
        });
    } catch (ex) {
        res.status(500).send("Some error occured while deleting the Restaurant.");
    }
}