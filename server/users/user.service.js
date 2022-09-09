const config = require('config.json')
const jwt = require('jsonwebtoken')
const users = require('./userlist.json')

module.exports = {
  authenticate,
  getAllUsers,
}

async function authenticate({ username, password }) {
  const user = users.find(
    (user) => user.username === username && user.password === password
  )

  if (!user) throw 'Username or password is incorrect'

  // create a jwt token that is valid for 7 days
  const token = jwt.sign({ sub: user.id }, config.secret, {
    expiresIn: '10min',
  })

  return {
    ...omitPassword(user),
    token,
  }
}

async function getAllUsers() {
  return users.map((u) => omitPassword(u))
}

function omitPassword(user) {
  const { password, ...userWithoutPassword } = user
  return userWithoutPassword
}
