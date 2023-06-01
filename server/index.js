require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");
const userRoutes = require("./routes/signUp");
const authRoutes = require("./routes/signIn");
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



const port = process.env.PORT || 3000;
app.listen(port, console.log(`Listening on port ${port}...`));
