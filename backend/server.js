// import statements
require('dotenv').config();
const express = require('express');
const blogRoutes = require('./routes/blogRoutes');
const userRoutes = require('./routes/userRoutes');
const mongoose = require('mongoose');
const cors = require('cors');


// express app
const app = express()

// middleware
app.use(express.json());
app.use(cors({origin: process.env.CORS_ORIGIN}));
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
})
// routes
app.use('/api/blogs/', blogRoutes);
app.use('/api/user/', userRoutes);

// connect to mongodb and listen for requests
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        //listening for requests
        app.listen(process.env.PORT, () => {
            console.log('connected to db and listening on port', process.env.PORT)
        })
    })
    .catch((err) => {console.log(err)})


