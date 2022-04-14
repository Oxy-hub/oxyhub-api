const awilix = require('awilix');

// Service imports
const { AuthService } = require('../services/AuthService');
const { UserService } = require('../services/UserService');
const { StateService } = require('../services/StateService');
const { DistrictService } = require('../services/DistrictService');
const { ParlourService } = require('../services/ParlourService');
const { OrderService } = require('../services/OrderService');
const { UtilityService } = require('../services/UtilityService');

// Repository imports
const { UserRepository } = require('../repositories/UserRepository');
const { TokenRepository } = require('../repositories/TokenRepository');
const { StateRepository } = require('../repositories/StateRepository');
const { DistrictRepository } = require('../repositories/DistrictRepository');
const { ParlourRepository } = require('../repositories/ParlourRepository');
const { OrderRepository } = require('../repositories/OrderRepository');
const { GithubRepository } = require('../repositories/GithubRepository');
const { GoogleRepository } = require('../repositories/GoogleRepository');

// Other imports
const UserModel = require('../models/User');
const { redisClient } = require('./redis');

// Create the container and set the injectionMode to PROXY (which is also the default).
const Container = awilix.createContainer({
  injectionMode: awilix.InjectionMode.PROXY
});

const awilixInit = () => {
  Container.register({
    // Services go here
    authService: awilix.asClass(AuthService),
    userService: awilix.asClass(UserService),
    stateService: awilix.asClass(StateService),
    districtService: awilix.asClass(DistrictService),
    parlourService: awilix.asClass(ParlourService),
    orderService: awilix.asClass(OrderService),
    utilityService: awilix.asClass(UtilityService),

    // Repositories go here
    userRepository: awilix.asClass(UserRepository),
    tokenRepository: awilix.asClass(TokenRepository),
    githubRepository: awilix.asClass(GithubRepository),
    googleRepository: awilix.asClass(GoogleRepository),
    stateRepository: awilix.asClass(StateRepository),
    districtRepository: awilix.asClass(DistrictRepository),
    parlourRepository: awilix.asClass(ParlourRepository),
    orderRepository: awilix.asClass(OrderRepository),

    // Other stuff goes here
    UserModel: awilix.asValue(UserModel),
    redisClient: awilix.asValue(redisClient)
  });
};

module.exports = { awilixInit, Container };
