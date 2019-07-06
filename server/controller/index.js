const cart = require('./cart')
const product = require('./product')
const user = require('./user')
const {authMiddleware} = require('../middleware/auth')

module.exports = (app) => {
    app.use('/api/cart', authMiddleware, cart)
    app.use('/api/product', authMiddleware, product)
    app.use('/auth', user)
}