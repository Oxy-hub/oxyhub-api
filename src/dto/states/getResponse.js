module.exports = states => ({
  states: states.map(state => ({ code: state.code, name: state.name })),
  total: states.length
});
