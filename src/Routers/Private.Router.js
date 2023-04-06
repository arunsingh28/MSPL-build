"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const school_controller_1 = __importDefault(require("../Controllers/school.controller"));
const register_school_1 = __importDefault(require("../Controllers/register.school"));
const settings_controller_1 = __importDefault(require("../Controllers/AdminPanelController/settings.controller"));
const sound_controller_1 = __importDefault(require("../Controllers/AdminPanelController/sound.controller"));
const multer_1 = __importDefault(require("multer"));
const registerWithFile_1 = __importDefault(require("../Controllers/registerWithFile"));
const academy_controller_1 = __importDefault(require("../Controllers/AdminPanelController/academy.controller"));
const user_controller_1 = __importDefault(require("../Controllers/AdminPanelController/user.controller"));
const food_controller_1 = __importDefault(require("../Controllers/Nutrition/food.controller"));
const Recipies_controller_1 = __importDefault(require("../Controllers/Nutrition/Recipies.controller"));
const Package_controller_1 = __importDefault(require("../Controllers/AdminPanelController/Package.controller"));
const nutrisist_controller_1 = __importDefault(require("../Controllers/AdminPanelController/nutrisist.controller"));
const banner_controller_1 = __importDefault(require("../Controllers/Mobile/banner.controller"));
const sportsList_controller_1 = __importDefault(require("../Controllers/AdminPanelController/sportsList.controller"));
const client_controller_1 = __importDefault(require("../Controllers/Nutrition/client.controller"));
const router = express_1.default.Router();
var storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, __dirname + "../../" + "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-bulk-${file.originalname}`);
    },
});
const upload = (0, multer_1.default)({ storage });
// school apis
router.route('/create-school').post(register_school_1.default.registerForSchool);
router.route('/get-all-school').get(school_controller_1.default.getAllSchool);
router.route('/school-count').get(school_controller_1.default.schoolStatCount);
router.route('/delete-school/:id').delete(school_controller_1.default.schoolDelete);
router.route('/search-school').post(school_controller_1.default.searchSchool);
router.route('/get-school/:id').get(school_controller_1.default.schoolViewById);
router.route('/create-school-from-file').post(upload.single('file'), registerWithFile_1.default.registerSchoolWithFile);
// admin panel apis
router.route('/verify-token/:token').get(settings_controller_1.default.verifyLogin);
router.route('/change-password/:_id').post(settings_controller_1.default.changePassword);
router.route('/sound-change/:_id').post(sound_controller_1.default.updateSoundSetting);
router.route('/sound-change/grab/:_id').get(sound_controller_1.default.sendSoundSetting);
router.route('/create-emp-from-file').post(upload.single('file'), registerWithFile_1.default.registerEmpWithFile);
// user
router.route('/get-all-user').get(user_controller_1.default.getAllUsers);
// filter user
router.route('/filter-user').post(user_controller_1.default.filterUser);
router.route('/get-user-info/:id').get(user_controller_1.default.getUserById);
// academy apis
router.route('/create-academy').post(academy_controller_1.default.registerAcademy);
router.route('/create-coache').post(academy_controller_1.default.createCoach);
router.route('/create-ingridient-from-file').post(upload.single('file'), food_controller_1.default.addIngridientWithFile);
router.route('/create-ingridient').post(food_controller_1.default.addIngridient);
router.route('/fetch-ingridient').get(food_controller_1.default.sendIngridients);
router.route('/delete-ingridient/:id').delete(food_controller_1.default.deleteIngridients);
router.route('/create-recipe-category').post(food_controller_1.default.recipieCategory);
router.route('/fetch-recipie-category').get(food_controller_1.default.sendrecipieCategory);
router.route('/delete-recipe-category/:id').delete(food_controller_1.default.deleteRecipeCategory);
router.route('/update-recipe-category/:id').put(food_controller_1.default.updateRecipeCategory);
router.route('/create-diet-frequency').post(food_controller_1.default.addDietFrequency);
router.route('/fetch-diet-frequency').get(food_controller_1.default.sendDietFrequency);
router.route('/delete-diet-frequency/:id').delete(food_controller_1.default.deleteDietFrequency);
router.route('/update-diet-frequency/:id').put(food_controller_1.default.updateDietFrequency);
router.route('/save-recipe').post(upload.single('file'), Recipies_controller_1.default.saveNewRecipie);
router.route('/get-recipe').get(Recipies_controller_1.default.getRecipe);
router.route('/delete-recipe/:id').delete(Recipies_controller_1.default.deleteRecipe);
router.route('/get-recipe-by-id/:id').get(Recipies_controller_1.default.getRecipeById);
router.route('/update-recipe')
    .post(upload.single('file'), Recipies_controller_1.default.updateRecipe)
    .put(upload.single('file'), Recipies_controller_1.default.updateRecipe);
// nutritist profile
router.route('/update-nutritist-profile/:id').put(upload.single('file'), nutrisist_controller_1.default.updateProfile);
router.route('/get-nutritist-profile/:id').get(nutrisist_controller_1.default.getNutritionProfile);
// remove profile iamge
router.route('/remove-profile-image/:key/:id').delete(nutrisist_controller_1.default.removeImage);
// package apis
router.route('/create-package').post(Package_controller_1.default.handleSavePackage);
router.route('/get-all-package').get(Package_controller_1.default.handleGetAllPackages);
// attach user
router.route('/attach-user-to-nutritionist/:id/:nutriID').post(nutrisist_controller_1.default.attachUser);
router.route('/fetch-all-client/:id').get(client_controller_1.default.fetchClient);
// mobile banner
router.route('/create-banner').post(upload.single('file'), banner_controller_1.default.uploadBanner);
// get all sport by category
router.route('/get-all-sportlist').get(sportsList_controller_1.default.sportsList);
// get save sport intake
router.route('/save-sportlist').post(upload.single('file'), sportsList_controller_1.default.saveSportsList);
// update sport 
// :id is sport id
router.route('/update-sportlist/:id').put(upload.single('file'), sportsList_controller_1.default.updateSportsList);
// delete sport
router.route('/delete-sportlist/:id').delete(sportsList_controller_1.default.deleteSportsList);
exports.default = router;
