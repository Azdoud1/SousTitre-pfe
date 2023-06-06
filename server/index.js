require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");
const userRoutes = require("./routes/signUp");
const authRoutes = require("./routes/signIn");
const session = require('express-session');

const {readdirSync} = require("fs");
const path = require("path");


// database connection
connection();

// middlewares
app.use(express.json());
app.use(cors());

// routes
app.use("/api/signUp", userRoutes);
app.use("/api/signIn", authRoutes);


//serve static files
app.use('/public', express.static(path.join(__dirname, 'public')))
readdirSync('./routes').map((route) => app.use('/api', require('./routes/' + route)))

// configure session middleware
app.use(session({
    secret: 'JWTPRIVATEKEY',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 3600000, // session expiration time in milliseconds (1 hour)
        secure: false, // set to true if using HTTPS
        httpOnly: true, // prevent client-side JavaScript from accessing the cookie
    },
}));

// define a route for the sign-out functionality
app.post('/api/signOut', (req, res) => {
    // destroy the user session
    req.session.destroy(err => {
        if (err) {
            console.log(err);
            res.status(500).send('Error');
        } else {
            res.send('Signed out successfully');
        }
    });
});


const port = process.env.PORT || 3000;
app.listen(port, console.log(`Listening on port ${port}...`));
