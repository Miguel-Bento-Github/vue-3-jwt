require('rootpath')()
const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const jwt = require('_helpers/jwt')
const errorHandler = require('_helpers/error-handler')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

// use JWT auth to secure the api
app.use(jwt())

// api routes
app.use('/users', require('./users/users.controller'))

// global error handler
app.use(errorHandler)

// start server

const server = app.listen(8008, () => {
  const { port } = server.address()
  console.info(`https://localhost:${port}`)
})
