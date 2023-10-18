const express = require("express");
const app = express();
const restaurantRouter = require('./routes/restaurant')

//TODO: Create your GET Request Route Below: 
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/restaurants', restaurantRouter)

module.exports = app;