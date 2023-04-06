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
const course_model_1 = __importDefault(require("../../Models/course.model"));
const saveModuleName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { courseDescription, courseTitle } = req.body;
    try {
        const course = yield course_model_1.default.create({
            courseTitle,
            courseDescription
        });
        res.status(200).json({ success: true, data: course });
    }
    catch (err) {
        console.log(err);
        if (err.code === 11000) {
            return res.status(400).json({ success: false, message: 'Module name already exists' });
        }
        res.status(500).json({ success: false, message: err.message });
    }
});
// send the all modules
const getAllModules = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const course = yield course_model_1.default.find();
        res.status(200).json({ success: true, data: course });
    }
    catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});
const getModuleById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const course = yield course_model_1.default.findById(id);
        res.status(200).json({ success: true, data: course });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});
// udpate the module name
const updateModuleName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.body;
        const course = yield course_model_1.default.findByIdAndUpdate(req.params.id, {
            moduleNames: name
        });
        res.status(200).json({ success: true, data: course });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});
const sendModules = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const course = yield course_model_1.default.findById(req.params.id).select('moduleNames').lean();
        console.log(course);
        res.status(200).json({ success: true, data: course });
    }
    catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});
const updateLesson = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { lessonName, lessonContent } = req.body;
        const course = yield course_model_1.default.findByIdAndUpdate(req.params.id, {
            $push: {
                lessons: [
                    {
                        lessonName: lessonName,
                        lessonContent: lessonContent
                    }
                ]
            }
        });
        res.status(200).json({ success: true, data: course });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});
const shareCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const course = yield course_model_1.default.find({}).exec();
        res.status(200).json({ success: true, data: course });
    }
    catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});
exports.default = { saveModuleName, getAllModules, getModuleById, updateModuleName, sendModules, shareCourse, updateLesson };
