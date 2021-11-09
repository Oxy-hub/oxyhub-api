const userControllers = require('../controllers/users');
const { validateDto } = require('../middlewares');
const { registerUserRequestDto } = require('../dto');

module.exports = (router, controllers = userControllers) => {
  router.post(
    '/',
    validateDto(registerUserRequestDto),
    controllers.registerUser
  );
  router.get('/me', controllers.getUser);

  return router;
};

/**
 * @openapi
 * /users:
 *  post:
 *    summary: Register a new user
 *    tags: [Auth]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/AuthRequest'
 *    responses:
 *      200:
 *        description: Successful Response
 *        content:
 *            application/json:
 *              schema:
 *                $ref: '#components/schemas/AuthResponse'
 *        headers:
 *          Set-Cookie:
 *            schema:
 *              type: string
 *              description : Refresh token is sent back via secure HttpOnly cookie if is_initial=false
 *      400:
 *        description: OAuth code is missing/Github failed to authorize user
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#components/schemas/ErrorResponseData'
 *            examples:
 *              OAuth code is missing:
 *                value: {message: 'OAuth code is missing',httpStatus: 400}
 *              Github failed to authorize user:
 *                value: {message: 'Github failed to authorize user',httpStatus: 400}
 *      500:
 *        description: Internal server error
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#components/schemas/ErrorResponseData'
 *            examples:
 *              Internal Server Errror:
 *                $ref: '#components/examples/InternalServerError'
 */
