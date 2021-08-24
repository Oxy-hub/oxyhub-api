const awilix = require('awilix');
const UserService = require('../services/UserService');
const AuthService = require('../services/AuthService');
const UserRepository = require('../repositories/UserRepository');
const TokenRepository = require('../repositories/TokenRepository');

// Create the container and set the injectionMode to PROXY (which is also the default).
const Container = awilix.createContainer({
  injectionMode: awilix.InjectionMode.PROXY
});

const awilixInit = ({ redisClient: redis }) => {
  Container.register({
    userService: awilix.asClass(UserService),
    authService: awilix.asClass(AuthService),
    userRepository: awilix.asClass(UserRepository),
    tokenRepository: awilix.asClass(TokenRepository),
    redisClient: awilix.asValue(redis)
  });
};

module.exports = { awilixInit, Container };
