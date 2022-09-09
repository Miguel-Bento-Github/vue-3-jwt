const express = require('express')
const router = express.Router()
const userService = require('./user.service')

// routes
router.post('/authenticate', authenticate)
router.get('/', getAllUsers)

module.exports = router

function authenticate(req, res, next) {
  userService
    .authenticate(req.body)
    .then((user) => res.json(user))
    .catch(next)
}

function getAllUsers(req, res, next) {
  userService
    .getAllUsers()
    .then((users) => res.json(users))
    .catch(next)
}
