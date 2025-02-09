// Initialize express router
let router = require('express').Router();

// Set default API response
router.get('/', function(req, res) {
    res.json({
        status: 'API Its Working',
        message: 'Welcome to RESTHub crafted with love!',
    });
});

// Import Users Controller
var usersController = require('../controllers/usersController');
const validateCreateUser = require('../middleware/userMiddleware');
// Users Routes
router.route('/users')
    .get(usersController.index)
    .post(validateCreateUser, usersController.new);
router.route('/users/:users_id')
    .get(usersController.view)
    .patch(usersController.update)
    .put(usersController.update)
    .delete(usersController.delete);

// Export API routes
module.exports = router;