"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const regsiter_controller_1 = __importDefault(require("../Controllers/regsiter.controller"));
const loginWithPassword_1 = __importDefault(require("../Controllers/AdminPanelController/loginWithPassword"));
const refreshToken_controller_1 = __importDefault(require("../Controllers/refreshToken.controller"));
const logout_1 = __importDefault(require("../Controllers/logout"));
const login_1 = __importDefault(require("../Controllers/endUserController/login"));
const nutrisist_controller_1 = __importDefault(require("../Controllers/AdminPanelController/nutrisist.controller"));
/**
 * register api
 * @swagger
 * /v1/api/register:
 *  post:
 *      description: Create new user
 *      parameters:
 *      - firstName: title
 *        description: user first name
 *        in: formData
 *        required: true
 *        type: String
 *      responses:
 *        201:
 *           description: Success
 */
router.route('/register')
    .get((req, res) => { return res.json({ message: 'GET METHOD NOT ALLOWED' }); })
    .post(regsiter_controller_1.default);
router.route('/logout').get(logout_1.default);
/**
 * login api
 * @swagger
 * /v1/api/login:
 *  post:
 *      description: send the otp to phone
 *      parameters:
 *      - phone: title
 *        description: user phone number (10 digit)
 *        in: formData
 *        required: true
 *        type: Mobile number
 *      responses:
 *        200:
 *           description: Success
 *        cookie:
 *           description: token (valid for 2-5 min only. After that token will expire)
 *        otp:
 *           description: otp
 */
/**login api
 * @swagger
 * /v1/api/login:
 *  put:
 *      description: verify the otp
 *      parameters:
 *      - otp: title
 *        description: enter otp which is sent to phone
 *        in: formData
 *        required: true
 *        type: OTP
 *      responses:
 *        200:
 *           description: Success
 *        cookie:
 *           description: refresh token (valid for 1 day)
 *        access token:
 *           description: access token (valid for 10-20 min. After that it will expire)
 */
// login with password
router.route('/login')
    .get((req, res) => { return res.json({ message: 'GET METHOD NOT ALLOWED' }); })
    .post(loginWithPassword_1.default.loginWithPassword);
router.route('/refresh-token').get(refreshToken_controller_1.default);
// end user apis
// router.route('/create-end-user').post(endUserController.regsiterEndUser)
// send the otp
router.route('/send-otp').post(login_1.default.loginWithPhone);
router.route('/verify-otp').post(login_1.default.verifyOTP);
router.route('/diet-plan/:id').post(nutrisist_controller_1.default.dietPlanner);
exports.default = router;
