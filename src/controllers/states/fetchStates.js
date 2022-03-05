const { Container } = require('../../loaders/awilix');
const { createSuccessDto, state: stateDtos } = require('../../dto');

exports.getStates = async (req, res) => {
  // Resolve States service from container
  const StateService = Container.resolve('stateService');
  console.log('Hello World');

  // Fetch all states
  const states = await StateService.fetchStates();

  // Return the states
  return res.send(
    createSuccessDto(`States found!`, stateDtos.getResponse(states))
  );
};
