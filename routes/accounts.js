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
var accountsController = require('../controllers/accountsController');
const validateCreateAccount = require('../middleware/accountsMiddleware');

// Accounts Routes
router.route('/accounts')
    .get(accountsController.index)
    .post(validateCreateAccount, accountsController.new);
router.route('/accounts/:account')
    .get(accountsController.view)

// Export API routes
module.exports = router;