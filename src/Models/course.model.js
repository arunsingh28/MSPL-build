"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const courseSchema = new mongoose_1.default.Schema({
    courseTitle: { type: String, required: true, unique: true },
    courseDescription: { type: String, required: true },
    moduleNames: {
        type: [{
                id: { type: Number },
                moduleName: { type: String }
            }],
        _id: false,
        default: [
            {
                id: 1,
                moduleName: ''
            },
        ]
    },
    lessons: {
        type: [{
                lessonName: { type: String },
                lessonContent: { type: String },
            }],
        _id: false,
        default: [
            {
                lessonName: '',
                lessonContent: '',
            },
        ]
    }
});
exports.default = mongoose_1.default.model('Course', courseSchema);
