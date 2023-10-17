const express = require("express");
const app = express();
const Restaurant = require("../models/index")
const db = require("../db/connection");

//TODO: Create your GET Request Route Below: 
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/restaurants', async (req, res) => {
    const restaurants = await Restaurant.findAll()
    res.json(restaurants)
})

app.get('/restaurants/:id', async(req, res, next) => {
    const id = req.params.id
    try{
        const restaurant = await Restaurant.findByPk(id)
        if(!restaurant){
            throw new Error('No restaurant with that id found')
        }
        res.send(restaurant)
    }catch(err){
        next(err)
    }
})

//Create a restaurant

app.post('/restaurants', async(req, res, next) => {
    try {
        const restaurant = await Restaurant.create(req.body)
        if(!restaurant){
            throw new Error('Restaurant not created')
        }
        res.send(restaurant)     
    } catch (error) {
        next(error)
    }
   
})

app.put('/restaurants/:id', async(req, res, next) => {
    const id = req.params.id
    try {
        const selectedRestaurant = await Restaurant.findByPk(id)
        const updatedRestaurant = await selectedRestaurant.update(req.body)
        if(!updatedRestaurant){
            throw new Error('No Restaurant with that id found')
        }
        res.send(updatedRestaurant)
    } catch (error) {
        next(error)
    }
})

app.delete('/restaurants/:id', async(req, res, next) => {
    const id = req.params.id
    try {
        const selectedRestaurant = await Restaurant.findByPk(id)
        const deletedRestaurant = await selectedRestaurant.destroy()
        if(!deletedRestaurant){
            throw new Error('No restaurant deleted')
        }
        res.send(deletedRestaurant)
    }catch(error){
        next(error)
    }
})


module.exports = app;