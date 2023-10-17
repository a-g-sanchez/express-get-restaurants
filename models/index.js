const Restaurant = require('./Restaurant')
const Menu = require('./Menu')
const Item = require('./Item')

Restaurant.hasMany(Menu)
Menu.belongsTo(Restaurant)

Item.belongsToMany(Menu, {through: 'menuItem'})
Menu.belongsToMany(Item, {through: 'menuItem'})

module.exports = {
    Restaurant,
    Menu,
    Item
};