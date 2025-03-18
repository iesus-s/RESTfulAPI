// Import contact model
const Account = require('../models/accountsModel');
// Import Encryption for passwords
const crypto = require('crypto');
require('dotenv').config();

const algorithm = 'aes-256-cbc';
const secretKey = process.env.SECRET_KEY; // 32-character hex key
const iv = crypto.randomBytes(16);

function encrypt(text) {
    const cipher = crypto.createCipheriv(algorithm, Buffer.from(secretKey, 'hex'), iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return iv.toString('hex') + ':' + encrypted; // Store IV with encrypted text
}

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
        // Encrypt everything before saving
        const unencryptedAccount = req.body.account;
        const encryptedUsername = encrypt(req.body.username);
        const encryptedEmail = encrypt(req.body.email);
        const encryptedPassword = encrypt(req.body.password);

        const account = new Account({
            account: unencryptedAccount,
            username: encryptedUsername,
            email: encryptedEmail,
            password: encryptedPassword,
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