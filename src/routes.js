const express = require('express')
const validate = require('express-validation')
const handle = require('express-async-handler')

const routes = express.Router()

const authMiddleware = require('./app/middlewares/auth')

const controllers = require('./app/controllers')
const validators = require('./app/validators')

/**
 * Users
 */
routes.get('/users', handle(controllers.UserController.index))
routes.post('/users', validate(validators.User), handle(controllers.UserController.store))
routes.post('/sessions', validate(validators.Session), handle(controllers.SessionController.store))

routes.use(authMiddleware)
// routes.get('/teste', authMiddleware, (req, res) => res.json({ ok: true }))

/**
 * Ads
 */
routes.get('/ads', handle(controllers.AdController.index))
routes.get('/ads/:id', handle(controllers.AdController.show))
routes.post('/ads', validate(validators.Ad), handle(controllers.AdController.store))
routes.put('/ads/:id', validate(validators.Ad), handle(controllers.AdController.update))
routes.delete('/ads/:id', handle(controllers.AdController.destroy))

/**
 * Purchases
 */
routes.post('/purchases', validate(validators.Purchase), handle(controllers.PurchaseController.store))
routes.put('/purchases/:id', handle(controllers.ApproveController.update))

module.exports = routes
