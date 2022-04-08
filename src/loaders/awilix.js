const awilix = require('awilix');
// Service imports
const { UserService } = require('../services/UserService');
const { TokenService } = require('../services/TokenService');
const { StateService } = require('../services/StateService');
const { DistrictService } = require('../services/DistrictService');
const { ParlourService } = require('../services/ParlourService');
const { OrderService } = require('../services/OrderService');

// Repository imports
const { UserRepository } = require('../repositories/UserRepository');
const { TokenRepository } = require('../repositories/TokenRepository');
const { StateRepository } = require('../repositories/StateRepository');
const { DistrictRepository } = require('../repositories/DistrictRepository');
const { ParlourRepository } = require('../repositories/ParlourRepository');
const { OrderRepository } = require('../repositories/OrderRepository');

// Other imports
const GithubRepository = require('../repositories/GithubRepository');
const MongooseUserModel = require('../models/User');

// Create the container and set the injectionMode to PROXY (which is also the default).
const Container = awilix.createContainer({
  injectionMode: awilix.InjectionMode.PROXY
});

const awilixInit = ({ redisClient: redis }) => {
  Container.register({
    // Services go here
    userService: awilix.asClass(UserService),
    tokenService: awilix.asClass(TokenService),
    stateService: awilix.asClass(StateService),
    districtService: awilix.asClass(DistrictService),
    parlourService: awilix.asClass(ParlourService),
    orderService: awilix.asClass(OrderService),

    // Repositories go here
    userRepository: awilix.asClass(UserRepository),
    tokenRepository: awilix.asClass(TokenRepository),
    githubRepository: awilix.asClass(GithubRepository),
    stateRepository: awilix.asClass(StateRepository),
    districtRepository: awilix.asClass(DistrictRepository),
    parlourRepository: awilix.asClass(ParlourRepository),
    orderRepository: awilix.asClass(OrderRepository),

    // Other stuff goes here
    mongooseUserModel: awilix.asValue(MongooseUserModel),
    redisClient: awilix.asValue(redis)
  });
};

module.exports = { awilixInit, Container };
