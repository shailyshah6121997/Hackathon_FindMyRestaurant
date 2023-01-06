module.exports = function(app) {
    const restaurantHandler = require('../controllers/restaurant.controller');
    app.route('/api/restaurant/add').post(restaurantHandler.createRestaurant);
    app.route('/api/restaurant').get(restaurantHandler.getRestaurants);
    app.route('/api/restaurant/categories').get(restaurantHandler.getCategories)
    app.route('/api/restaurant/categories/:categoryName').get(restaurantHandler.getRestaurantsByCategory);
    app.route('/api/restaurant/:id').get(restaurantHandler.getRestaurantById);
    app.route('/api/restaurant/rating/:ratingValue').get(restaurantHandler.getRestaurantsByRating);
}