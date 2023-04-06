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
const tutorial_lms_1 = require("../Models/tutorial.lms");
const emp_model_1 = __importDefault(require("../Models/emp.model"));
// get info
const getTutorialInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = yield ((_a = req.session.user) === null || _a === void 0 ? void 0 : _a._id);
    try {
        const info = yield emp_model_1.default.findById(userId).exec();
        const tutorial = yield tutorial_lms_1.Tutorial.findOne({ intiater: userId }).exec();
        return res.status(200).json({ info: info === null || info === void 0 ? void 0 : info.tutorialTimeline, tutorial, success: false });
    }
    catch (error) {
        return res.status(500).json({ message: error.message, success: false });
    }
});
const initTutorial = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const userId = yield ((_b = req.session.user) === null || _b === void 0 ? void 0 : _b._id);
    // console.log(req.user)
    if (!req.body.name || !req.body.description) {
        return res.status(400).json({ message: 'All fields are required', success: false });
    }
    try {
        const isExits = yield tutorial_lms_1.Tutorial.findOne({ TutorialTitle: req.body.name });
        if (isExits) {
            return res.status(400).json({ message: 'Tutorial already exists', success: false });
        }
        // update user tutorialTimeline initTutorial to true
        const emp = yield emp_model_1.default.findById(userId).exec();
        if (emp) {
            emp.tutorialTimeline.initTutorial = false;
            emp.tutorialTimeline.createModule = true;
            yield emp.save();
        }
        const tutorial = new tutorial_lms_1.Tutorial({
            TutorialTitle: req.body.name,
            intiater: userId,
            TutorialDescription: req.body.description
        });
        yield tutorial.save();
        return res.status(201).json({ message: 'Tutorial Initiate Successfully', success: true });
    }
    catch (error) {
        return res.status(500).json({ message: error.message, success: false });
    }
});
const initModule = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const userId = yield ((_c = req.session.user) === null || _c === void 0 ? void 0 : _c._id);
    if (!req.body.modules || !req.body.name) {
        return res.status(400).json({ message: 'All fields are required', success: false });
    }
    try {
        const tutorial = yield tutorial_lms_1.Tutorial.findOne({ TutorialTitle: req.body.name });
        const emp = yield emp_model_1.default.findById(userId).exec();
        if (emp) {
            emp.tutorialTimeline.createModule = false;
            emp.tutorialTimeline.nameModule = true;
            yield emp.save();
        }
        if (!tutorial) {
            return res.status(404).json({ message: 'Tutorial not found', success: false });
        }
        tutorial.moduleNumber = req.body.modules;
        yield tutorial.save();
        return res.status(201).json({ message: req.body.modules + ' Module Initiate Successfully', success: true });
    }
    catch (error) {
        return res.status(500).json({ message: error.message, success: false });
    }
});
const initModuleName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    const userId = yield ((_d = req.session.user) === null || _d === void 0 ? void 0 : _d._id);
    if (!req.body.name || !req.body.moduleName || !req.body.moduleDescription) {
        return res.status(400).json({ message: 'All fields are required', success: false });
    }
    try {
        const tutorial = yield tutorial_lms_1.Tutorial.findOne({ TutorialTitle: req.body.name });
        const emp = yield emp_model_1.default.findById(userId).exec();
        if (emp) {
            emp.tutorialTimeline.nameModule = false;
            emp.tutorialTimeline.designModule = true;
            yield emp.save();
        }
        if (!tutorial) {
            return res.status(404).json({ message: 'Tutorial not found', success: false });
        }
        const intoDB = new Promise((resolve, reject) => {
            Object.keys(req.body.moduleName).map((name) => {
                reject(tutorial.module.push({
                    moduleTitle: req.body.moduleName[name],
                    moduleDescription: req.body.moduleDescription[name]
                }));
            });
            resolve(tutorial.save());
        });
        yield intoDB.then(() => {
            return res.status(201).json({ message: 'Module Named Successfully', success: true });
        }).catch((error) => {
            return res.status(500).json({ message: error.message, success: false });
        });
    }
    catch (error) {
        return res.status(500).json({ message: error.message, success: false });
    }
});
const tutorialComplete = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _e;
    const userId = yield ((_e = req.session.user) === null || _e === void 0 ? void 0 : _e._id);
    try {
        const emp = yield emp_model_1.default.findById(userId).exec();
        if (emp) {
            emp.tutorialTimeline.initTutorial = true;
            emp.tutorialTimeline.createModule = false;
            emp.tutorialTimeline.nameModule = false;
            emp.tutorialTimeline.designModule = false;
            emp.tutorialTimeline.writeModule = false;
            yield emp.save();
            return res.status(201).json({ message: 'Tutorial Complete Successfully', success: true });
        }
    }
    catch (error) {
        return res.status(500).json({ message: error.message, success: false });
    }
});
exports.default = { initTutorial, initModule, initModuleName, getTutorialInfo, tutorialComplete };
