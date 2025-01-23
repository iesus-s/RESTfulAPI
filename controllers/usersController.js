// Import contact model
const User = require('../models/usersModel');

// Handle index actions
exports.index = async(req, res) => {
    try {
        const users = await User.find({});
        res.json({
            status: "success",
            message: "Users retrieved successfully",
            data: users
        });
    } catch (err) {
        res.status(500).json({
            status: "error",
            message: err.message,
        });
    }
};

// Handle Create Users Actions
exports.new = async(req, res) => {
    try {
        const user = new User({
            user_name: req.body.user_name,
            email: req.body.email,
            password: req.body.password,
        });
        await user.save();
        res.json({
            message: 'New User created!',
            data: user
        });
    } catch (err) {
        res.status(500).json({
            status: "error",
            message: err.message
        });
    }
};

// Handle View User Info
exports.view = async(req, res) => {
    try {
        const user = await User.findById(req.params.user_id);
        if (!user) {
            return res.status(404).json({
                status: "error",
                message: "User not found"
            });
        }
        res.json({
            message: 'User details loading...',
            data: user
        });
    } catch (err) {
        res.status(500).json({
            status: "error",
            message: err.message
        });
    }
};

// Handle Update User Info
exports.update = async(req, res) => {
    try {
        const user = await User.findById(req.params.user_id);
        if (!contact) {
            return res.status(404).json({
                status: "error",
                message: "User not found"
            });
        }

        // Update User Fields
        user.name = req.body.name || user.name;
        user.email = req.body.email;
        user.password = req.body.password;

        await user.save();
        res.json({
            message: 'User Info Updated',
            data: user
        });
    } catch (err) {
        res.status(500).json({
            status: "error",
            message: err.message
        });
    }
};

// Handle Delete User
exports.delete = async(req, res) => {
    try {
        const result = await User.deleteOne({ _id: req.params.user_id });
        if (result.deletedCount === 0) {
            return res.status(404).json({
                status: "error",
                message: "User not found"
            });
        }
        res.json({
            status: "success",
            message: 'User Deleted'
        });
    } catch (err) {
        res.status(500).json({
            status: "error",
            message: err.message
        });
    }
};