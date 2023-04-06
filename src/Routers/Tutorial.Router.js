"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const lms_controller_1 = __importDefault(require("../Controllers/LMS/lms.controller"));
const router = express_1.default.Router();
router.route('/init-course').post(lms_controller_1.default.saveModuleName);
router.route('/update-course/:id').put(lms_controller_1.default.updateModuleName);
router.route('/get-all-course').get(lms_controller_1.default.getAllModules);
router.route('/fetch-course/:id').get(lms_controller_1.default.getModuleById);
router.route('/fetch-modules/:id').get(lms_controller_1.default.sendModules);
router.route('/update-lesson/:id').put(lms_controller_1.default.updateLesson);
exports.default = router;
