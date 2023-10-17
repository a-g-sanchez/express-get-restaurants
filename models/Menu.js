const db = require('../db/connection')
const Sequelize = require('sequelize')

const Menu = db.define('Menu',{
    title: Sequelize.STRING
}) 

module.exports = Menu