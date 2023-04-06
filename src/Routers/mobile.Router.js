"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const user_controller_1 = __importDefault(require("../Controllers/AdminPanelController/user.controller"));
const Package_controller_1 = __importDefault(require("../Controllers/AdminPanelController/Package.controller"));
const mobile_controller_1 = __importDefault(require("../Controllers/Mobile/mobile.controller"));
const lms_controller_1 = __importDefault(require("../Controllers/LMS/lms.controller"));
const editUser_controller_1 = __importDefault(require("../Controllers/Mobile/editUser.controller"));
router.route('/create-end-user').post(user_controller_1.default.regsiterEndUser);
router.route('/get-user-info/:id').get(user_controller_1.default.getUserById);
router.route('/get-all-package').get(Package_controller_1.default.handleGetAllPackages);
//get user info by id
router.route('/get-user-info/:id').get(user_controller_1.default.getUserById);
// get nutrition apis
router.route('/get-nutrition-profile/:id').get(mobile_controller_1.default.nutritionProfile);
// get all packages
// controller file -> src/Controllers/AdminPanelController/Package.controller.ts
router.route('/get-all-package').get(Package_controller_1.default.handleGetAllPackages);
// get all recpies
router.route('/get-all-recpies').get(mobile_controller_1.default.sendAllRecipie);
// get recpie by category
router.route('/get-recpie-by-category/:category').get(mobile_controller_1.default.sendRecipieByCategory);
// water apis
router.route('/water-intake').get(mobile_controller_1.default.saveWaterIntake);
router.route('/water-outtake').get(mobile_controller_1.default.saveWaterOuttake);
router.route('/get-all-course').get(lms_controller_1.default.getAllModules);
router.route('/get-banner').get(mobile_controller_1.default.getBanner);
// home api
router.route('/home/:id').get(mobile_controller_1.default.homePage);
// edit profile
router.route('/update-profile/:id').post(editUser_controller_1.default.updateUserProfile);
// get all food category
router.route('/get-all-food-category').get(mobile_controller_1.default.getFoodCategory);
exports.default = router;
