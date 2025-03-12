// Import express
let express = require('express');
// Import Body parser
let bodyParser = require('body-parser');
// Import Mongoose
let mongoose = require('mongoose');
// Import CORS
let cors = require('cors');

// Initialise the app
let app = express();

// Get environment variables
const MONGO_URI = process.env.MONGO_URI;

// Import routes
let apiRoutes = require("./routes/accounts");

// Enable CORS
app.use(cors());

// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// Connect to Mongoose and set connection variable
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection;

// Added check for DB connection
if (!db)
    console.log("Error connecting db");
else
    console.log("Db connected successfully");

// Setup server port
var port = process.env.PORT || 8080;

// Send message for default URL
app.get('/', (req, res) => res.send('Hello World with Express'));

// Use API routes in the App
app.use('/api', apiRoutes);

// Launch app to listen to specified port
app.listen(port, function() {
    console.log("Running RestHub on port " + port);
});