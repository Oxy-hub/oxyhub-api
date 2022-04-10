const authControllers = require('../controllers/auth');
const { validateDto } = require('../middlewares');
const { authRequestDto } = require('../dto');

module.exports = (router, controllers = authControllers) => {
  router.post('/login', validateDto(authRequestDto), controllers.oAuthLogin);
  router.get('/callback', controllers.callbackHandler);

  return router;
};

/**
 * @openapi
 * components:
 *  schemas:
 *    AuthRequest:
 *       type: object
 *       required:
 *        - code
 *       properties:
 *         code:
 *           type: string
 *           description: OAuth code to exchange for user profile
 *       example:
 *        code: v3Sa9u7U+q5$#1<:xPpjeP$jqlLvy@Q_w!L%QwPa(D%HiyY0GYGZ|=r~;t[1(^Q
 *
 *    AuthResponse:
 *      type: object
 *      required:
 *        - access_token
 *        - is_initial
 *        - is_authenticated
 *        - user
 *      properties:
 *        access_token:
 *          type: string
 *          description: Access token for the user
 *        is_initial:
 *          type: boolean
 *          description: Indicates whether user is initial
 *        is_authenticated:
 *          type: boolean
 *          description: Indicates whether the user is authenticated with the server (user cannot be inital and authenticated at the same time)
 *        user:
 *          type: object
 *          description: Contains user details if is_initial=true, otherwise contains null
 *          properties:
 *            first_name:
 *              type: string
 *              description: Contains the first name of the user (from OAuth provider)
 *            middle_name:
 *              type: string
 *              description: Contains the middle name of the user (from OAuth provider)
 *            last_name:
 *              type: string
 *              description: Contains the last name of the user (from OAuth provider)
 *            email:
 *              type: string
 *              description: Contains the email of the user with which the OAuth consent was given
 *      example:
 *        access_token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkw.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
 *        is_initial: true
 *        is_authenticated: false
 *        user:
 *          first_name: John
 *          middle_name: Pastor
 *          last_name: Doe
 *          email: john@example.com
 */

/**
 * @openapi
 * /auth/github:
 *  post:
 *    summary: Perform OAuth flow using Github
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
