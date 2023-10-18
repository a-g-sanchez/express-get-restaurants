const { Restaurant, Menu, Item } = require('../../models')
const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')

//Get a restaurant
router.get('/', async (req, res) => {
    const restaurants = await Restaurant.findAll({
        include: Menu
    })
    
    res.json(restaurants)
})

//Get a restaurant by ID
router.get('/:id', async(req, res, next) => {
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
router.post('/',[
    check('name').not().isEmpty().trim(),
    check('location').not().isEmpty().trim(),
    check('cuisine').not().isEmpty().trim()
    ], async(req, res, next) => {

    const errors = validationResult(req)
    
    if(!errors.isEmpty()){
        res.send({errors: errors.array()})
    }else{    
        try {
            const restaurant = await Restaurant.create(req.body)
            if(!restaurant){
                throw new Error('Restaurant not created')
            }
            res.send(restaurant)     
        } catch (err) {
            next(err)
        }
    }
   
})

//Update a restaurant
router.put('/:id', async(req, res, next) => {
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

//Delete a restaurant
router.delete('/:id', async(req, res, next) => {
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

module.exports = router