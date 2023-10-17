const { describe, test, expect, beforeAll } = require('@jest/globals')
const request = require('supertest')
const app = require('./src/app')
const Restaurant = require('./models/index')
const syncSeed = require('./seed')

let restaurantQuantity

beforeAll(async() => {
    await syncSeed()
    const restaurants = await Restaurant.findAll()
    restaurantQuantity = restaurants.length
})


describe('Route tests', () => {
    test('GET should return 200 status code', async()=> {
        const response = await request(app)
            .get('/restaurants')

        
        expect(response.statusCode).toEqual(200)
    })

    test('GET should return an array', async () => {
        const response = await request(app).get('/restaurants')

        expect(Array.isArray(response.body)).toBe(true)
        expect(response.body[0]).toHaveProperty('name')
    })

    test('GET should return the correct number of restaurants', async () => {
        const response = await request(app).get('/restaurants')

        expect(response.body.length).toBe(restaurantQuantity)
    })

    test('GET should return the correct restaurant data', async() => {
        const response = await request(app).get('/restaurants')
        expect(response.body).toContainEqual(
            expect.objectContaining({
                id:1,
                name: "AppleBees",
                location: "Texas",
                cuisine: "FastFood"
            })
        )
    })

    test('GET should return the correct restaurant when given an id', async() => {
        const response = await request(app).get('/restaurants/1')
        
        expect(response.body).toEqual(
            expect.objectContaining({
                id:1,
                name: "AppleBees",
                location: "Texas",
                cuisine: "FastFood"
            })
        )
    })

    test('POST should return a larger array', async() => {
        const response = await request(app)
            .post('/restaurants')
            .send({
                name: "Chipotle",
                location: "Colorado",
                cuisine: "FastFood"
            })

        expect(response.body).toEqual(
            expect.objectContaining({
                name: "Chipotle",
                location: "Colorado",
                cuisine: "FastFood"
            })
        )
    })

    test('PUT should update the item with the given id', async() => {
        const response = await request(app)
            .put('/restaurants/1')
            .send({
                name: "Chili's"
            })

        expect(response.body).toHaveProperty('name')
        expect(response.body.name).toBe("Chili's")
    })

    test('DELETE should remove an item from the db with the given id', async () => {
        const response = await request(app)
            .delete('/restaurants/1')

        expect(response.body).toHaveProperty('id')
        expect(response.body.id).toBe(1)
    })
})