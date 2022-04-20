const districtControllers = require('../controllers/districts');
const { validateDto } = require('../middlewares');
const { isAuth } = require('../middlewares');
const { districts } = require('../dto');

module.exports = (router, controllers = districtControllers) => {
  router.get(
    '/',
    isAuth,
    validateDto(districts.getRequest, 'QUERY'),
    controllers.fetchDistricts
  );

  return router;
};
