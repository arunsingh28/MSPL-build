"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("../../Models/user.model"));
const emp_model_1 = __importDefault(require("../../Models/emp.model"));
const recipies_model_1 = __importDefault(require("../../Models/recipies.model"));
const mobile_banner_model_1 = __importDefault(require("../../Models/mobile.banner.model"));
const recipiCategory_model_1 = __importDefault(require("../../Models/recipiCategory.model"));
const sportsList_model_1 = require("../../Models/sportsList.model");
const saveWaterIntake = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const user = yield user_model_1.default.findById((_a = req.session.decoded) === null || _a === void 0 ? void 0 : _a.id);
        if (user) {
            // add 200 ml of water 
            user.waterIntake = user.waterIntake + 200;
            yield user.save();
            return res.status(200).json({ success: true, message: 'Water Intake Saved', consumeWater: user.waterIntake, statusCode: res.statusCode });
        }
        else {
            return res.status(401).json({ success: false, message: 'User not found', statusCode: res.statusCode });
        }
    }
    catch (err) {
        return res.status(200).json({ message: err.message, success: false });
    }
});
const saveWaterOuttake = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const user = yield user_model_1.default.findById((_b = req.session.decoded) === null || _b === void 0 ? void 0 : _b.id);
        if (user) {
            // add 200 ml of water 
            user.waterIntake = user.waterIntake - 200;
            yield user.save();
            return res.status(200).json({ success: true, message: 'Water outtake Saved', consumeWater: user.waterIntake, statusCode: res.statusCode });
        }
        else {
            return res.status(401).json({ success: false, message: 'User not found', statusCode: res.statusCode });
        }
    }
    catch (err) {
        return res.status(200).json({ message: err.message, success: false });
    }
});
// nutrion profile
const nutritionProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const nutrisist = yield emp_model_1.default.findById(req.params.id).populate('profile');
        if (nutrisist) {
            return res.status(200).json({ success: true, data: nutrisist, statusCode: res.statusCode });
        }
        else {
            return res.status(200).json({ success: false, data: null, statusCode: res.statusCode });
        }
    }
    catch (error) {
        return res.status(500).json({ message: 'Internal server error', success: false, statusCode: res.statusCode });
    }
});
const sendAllRecipie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const recipie = yield recipies_model_1.default.find({}).exec();
        if (recipie) {
            return res.status(200).json({ success: true, data: recipie, statusCode: res.statusCode });
        }
    }
    catch (error) {
        return res.status(500).json({ message: error.message, success: false, statusCode: res.statusCode });
    }
});
const sendRecipieByCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const category = req.params.category;
    const page = Number(req.query["page"]) || 1;
    const limit = Number(req.query["limit"]) || 10;
    const skip = (page - 1) * limit;
    try {
        // find the recipie by category inside tags of recipie
        const recipe = yield recipies_model_1.default.find({ tags: category }).skip(skip).limit(limit).exec();
        if (recipe) {
            return res.status(200).json({ success: true, data: recipe, statusCode: res.statusCode });
        }
    }
    catch (error) {
        return res.status(500).json({ message: error.message, success: false, statusCode: res.statusCode });
    }
});
const getBanner = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const banner = yield mobile_banner_model_1.default.find();
        res.status(200).json({ success: true, data: banner });
    }
    catch (err) {
        res.status(500).json({ success: false, data: null });
    }
});
const homePage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_model_1.default.findById(req.params.id).exec();
        const sportList = yield sportsList_model_1.sportsListDB.find().exec();
        const banner = yield mobile_banner_model_1.default.find().exec();
        if (user) {
            return res.status(200).json({
                success: true, data: {
                    calories: 0,
                    user: user,
                    sportsList: sportList,
                    banner: banner
                }, statusCode: res.statusCode
            });
        }
        else {
            return res.status(200).json({ success: false, data: null, statusCode: res.statusCode });
        }
    }
    catch (error) {
        return res.status(500).json({ message: 'Internal server error', success: false, statusCode: res.statusCode });
    }
});
const getFoodCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const foodCategory = yield recipiCategory_model_1.default.find().exec();
        res.status(200).json({ success: true, data: foodCategory });
    }
    catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});
exports.default = { saveWaterIntake, nutritionProfile, getFoodCategory, homePage, sendAllRecipie, getBanner, sendRecipieByCategory, saveWaterOuttake };
