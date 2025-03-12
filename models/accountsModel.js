const mongoose = require('mongoose');

// Setup schema
const accountsSchema = mongoose.Schema({
    account: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: true
    },
    create_date: {
        type: Date,
        default: Date.now
    }
});

// Export Account model
const Account = mongoose.model('Accounts', accountsSchema);
module.exports = Account;