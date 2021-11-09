const awilix = require('awilix');
const { UserService } = require('../services/UserService');
const { TokenService } = require('../services/TokenService');
const { UserRepository } = require('../repositories/UserRepository');
const { TokenRepository } = require('../repositories/TokenRepository');
const GithubRepository = require('../repositories/GithubRepository');
const MongooseUserModel = require('../models/User');

// Create the container and set the injectionMode to PROXY (which is also the default).
const Container = awilix.createContainer({
  injectionMode: awilix.InjectionMode.PROXY
});

const awilixInit = ({ redisClient: redis }) => {
  Container.register({
    userService: awilix.asClass(UserService),
    tokenService: awilix.asClass(TokenService),
    userRepository: awilix.asClass(UserRepository),
    tokenRepository: awilix.asClass(TokenRepository),
    githubRepository: awilix.asClass(GithubRepository),
    mongooseUserModel: awilix.asValue(MongooseUserModel),
    redisClient: awilix.asValue(redis)
  });
};

module.exports = { awilixInit, Container };
