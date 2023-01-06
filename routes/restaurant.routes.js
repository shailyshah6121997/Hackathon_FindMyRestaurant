module.exports = function(app) {
    const restaurantHandler = require('../controllers/restaurant.controller');
    app.route('/api/restaurant/add').post(restaurantHandler.createRestaurant);
    app.route('/api/restaurant').get(restaurantHandler.getRestaurants);
}