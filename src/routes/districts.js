const districtControllers = require('../controllers/districts');

module.exports = (router, controllers = districtControllers) => {
  router.get('/', controllers.fetchDistricts);

  return router;
};
