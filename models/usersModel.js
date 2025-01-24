const mongoose = require('mongoose');

// Setup schema
const userSchema = mongoose.Schema({
    user_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    retypePassword: {
        type: String,
        required: true
    },
    create_date: {
        type: Date,
        default: Date.now
    }
});

// Export Users model
const User = mongoose.model('User', userSchema);
module.exports = User;