const { apiPrefix } = require('../config');

const routes = ['/users', '/users/me'];

module.exports = routes.map(route => `${apiPrefix}${route}`);
