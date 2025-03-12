// Import contact model
const Account = require('../models/accountsModel');

// Handle index actions for accounts
exports.index = async(req, res) => {
    try {
        const accounts = await Account.find({});
        res.json({
            status: "success",
            message: "Accounts retrieved successfully",
            data: accounts
        });
    } catch (err) {
        res.status(500).json({
            status: "error",
            message: err.message,
        });
    }
};

// Handle Create Account Actions
exports.new = async(req, res) => {
    try {
        const account = new Account({
            account: req.body.account,
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        });
        await account.save();
        res.json({
            message: 'New Account Created!',
            data: account
        });
    } catch (err) {
        res.status(500).json({
            status: "error",
            message: err.message
        });
    }
};

// Handle View Account Info
exports.view = async(req, res) => {
    try {
        const account = await Account.find({ account: req.params.account });
        if (!account) {
            return res.status(404).json({
                status: "error",
                message: "Account Not Found"
            });
        }
        res.json({
            message: 'Account details loading...',
            data: account
        });
    } catch (err) {
        res.status(500).json({
            status: "error",
            message: err.message
        });
    }
};