const districtControllers = require('../controllers/districts');
const { validateDto } = require('../middlewares');
const { districts } = require('../dto');

module.exports = (router, controllers = districtControllers) => {
  router.get(
    '/',
    validateDto(districts.getRequest, 'QUERY'),
    controllers.fetchDistricts
  );

  return router;
};
