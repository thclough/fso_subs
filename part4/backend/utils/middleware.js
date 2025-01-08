const User = require('../models/user')
const jwt = require('jsonwebtoken')

const logger = require('./logger')

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

const userExtractor = async (request, response, next) => {
  // fetch the token and get info about user if available
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    request.token = authorization.replace('Bearer ', '')
  }

  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken) {
    response.status(401).json({ error: 'token invalid' })
  }
  request.user = await User.findById(decodedToken.id)
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'ValidationError' || error.name === 'PasswordTooShort') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')) {
    return response.status(400).json({ error: 'expected `username` to be unique' })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error})
  }

  next(error)
}

module.exports = {
  requestLogger,
  userExtractor,
  unknownEndpoint,
  errorHandler
}

