const { Container } = require('../../loaders/awilix');
const { createSuccessDto, states: stateDtos } = require('../../dto');

exports.fetchStates = async (req, res) => {
  // Resolve States service from container
  const StateService = Container.resolve('stateService');

  // Fetch all states
  const states = await StateService.fetchStates();

  // Return the states
  return res.send(
    createSuccessDto(`States found!`, stateDtos.getResponse(states))
  );
};
