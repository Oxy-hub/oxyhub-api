const express = require('express');
const user = require('./user');
const auth = require('./auth');

const init = router => {
  router.use('/auth', auth(express.Router()));
  router.use('/user', user(express.Router()));
  return router;
};

module.exports = { init };

/**
 * @openapi
 *  components:
 *    schemas:
 *      SuccessResponse:
 *        type: object
 *        properties:
 *          success:
 *            type: boolean
 *            description: Indicates whether the request was successful or not
 *          messsage:
 *            type: string
 *            description: Success message
 *          data:
 *            type: object
 *            description: Contains data for that particular successful response (Refer to the response schema of the endpoints)
 *          metadata:
 *            type: object
 *            description: Contains metadata of the request
 *
 *      ErrorResponse:
 *        type: object
 *        properties:
 *          success:
 *            type: boolean
 *            description: Indicates whether the request was successful or not
 *          error:
 *            type: object
 *            description: Error object which contains information about the error (refer ErrorResponseData schema)
 *          metadata:
 *            type: object
 *            description: Contains metadata of the request
 *
 *      ErrorResponseData:
 *        type: object
 *        properties:
 *          message:
 *            type: string
 *            description: Message describing the error
 *          httpStatus:
 *            type: integer
 *            description: Http status code of the error
 *
 *    examples:
 *      InternalServerError:
 *        value: {message: 'Something went wrong!',httpStatus: 500}
 */

/**
 * @openapi
 * tags:
 *   name: Auth
 */
