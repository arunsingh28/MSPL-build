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
const Formula_1 = __importDefault(require("../../services/Formula"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = __importDefault(require("../../../config/env"));
// Register End User
const regsiterEndUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized', success: false, stautsCode: 401 });
    }
    // decode the token
    const decodedToken = yield jsonwebtoken_1.default.verify(token, env_1.default._jwt_mobile_token_secret_key);
    const { name, email, dob, height, weight, gender } = req.body;
    if (!name || !email || !dob || !height || !weight || !gender) {
        return res.status(400).json({ message: 'Please fill all the fields', success: false, stautsCode: 400 });
    }
    try {
        const BMR = yield Formula_1.default.BMR(gender, height, weight, dob);
        const BMI = yield Formula_1.default.BMI(height, weight);
        const newUser = yield user_model_1.default.findById(decodedToken.id).exec();
        if (newUser) {
            newUser.BMI = BMI;
            newUser.BMR = BMR;
            newUser.name = name;
            newUser.email = email;
            newUser.measurement.height = height;
            newUser.measurement.weight = weight;
            newUser.gender = gender;
            newUser.dob = dob;
            newUser.profileTimeline = 'active';
            const savedUser = yield newUser.save();
            return res.status(200).json({ message: 'User Registered Successfully', success: true, data: savedUser, stautsCode: 200 });
        }
        else {
            return res.status(400).json({ message: 'token tempared', success: false, stautsCode: 400 });
        }
    }
    catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({ message: 'Email or Phone already exists', error: error.message, success: false, statusCode: 200 });
        }
        return res.status(500).json({ message: 'Internal Server Error', error: error.message, success: false, statusCode: 500 });
    }
});
// Get all users
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_model_1.default.find();
        return res.status(200).json(users);
    }
    catch (error) {
        return res.status(500).json({ message: 'Internal Server Error', error: error.message, success: false, statusCode: 500 });
    }
});
// get user by ID
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_model_1.default.findById(req.params.id);
        console.log('user::', user);
        if (!user) {
            return res.status(404).json({ message: 'User not found', success: false, statusCode: 404 });
        }
        return res.status(200).json(user);
    }
    catch (error) {
        return res.status(500).json({ message: 'Internal Server Error', error: error.message, success: false, statusCode: 500 });
    }
});
// user table filter
const filterUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // status : 'init' | 'active' | 'inactive' | 'all'
    // name : string
    let filterData;
    if (req.body.status === 'all') {
        if (req.body.name) {
            // filter data by name letter by letter with regex
            filterData = yield user_model_1.default.find({ name: { $regex: req.body.name, $options: 'i' } }).exec();
            return res.status(200).json({ filterData });
        }
        filterData = yield user_model_1.default.find().exec();
    }
    if (req.body.status === 'init') {
        if (req.body.name) {
            // filter data by name letter by letter with regex
            filterData = yield user_model_1.default.find({ name: { $regex: req.body.name, $options: 'i' } }).exec();
            return res.status(200).json({ filterData });
        }
        filterData = yield user_model_1.default.find({ profileTimeline: 'init' }).exec();
    }
    if (req.body.status === 'paid') {
        if (req.body.name) {
            // filter data by name letter by letter with regex
            filterData = yield user_model_1.default.find({ name: { $regex: req.body.name, $options: 'i' } }).exec();
            return res.status(200).json({ filterData });
        }
        filterData = yield user_model_1.default.find({ isPaid: true }).exec();
    }
    if (req.body.status === 'unpaid') {
        if (req.body.name) {
            // filter data by name letter by letter with regex
            filterData = yield user_model_1.default.find({ name: { $regex: req.body.name, $options: 'i' } }).exec();
            return res.status(200).json({ filterData });
        }
        filterData = yield user_model_1.default.find({ isPaid: false }).exec();
        filterData = filterData.filter((user) => user.profileTimeline !== 'init');
    }
    if (req.body.status === 'free') {
        if (req.body.name) {
            // filter data by name letter by letter with regex
            filterData = yield user_model_1.default.find({ name: { $regex: req.body.name, $options: 'i' } }).exec();
            return res.status(200).json({ filterData });
        }
        filterData = yield user_model_1.default.find({ nutritionist: undefined }).exec();
        // remove the lead user
        filterData = filterData.filter((user) => user.profileTimeline !== 'init');
    }
    if (req.body.status === 'attached') {
        if (req.body.name) {
            // filter data by name letter by letter with regex
            filterData = yield user_model_1.default.find({ name: { $regex: req.body.name, $options: 'i' } }).exec();
            return res.status(200).json({ filterData });
        }
        filterData = yield user_model_1.default.find({ nutritionist: { $exists: true } });
    }
    return res.status(200).json({ filterData });
});
exports.default = { regsiterEndUser, getAllUsers, getUserById, filterUser };
