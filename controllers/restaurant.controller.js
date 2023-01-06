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