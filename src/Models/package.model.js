"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const packageSchema = new mongoose_1.default.Schema({
    packageName: {
        type: String,
        required: true,
        unique: true,
    },
    packagePrice: {
        type: Number,
        required: true,
    },
    packageDuration: {
        type: Number,
        required: true,
    },
    packageDurationUnit: {
        type: String,
        required: true,
    },
    packageDescription: {
        type: String,
        required: true,
    },
    packagePoint: [],
    packageChild: []
});
exports.default = mongoose_1.default.model('package', packageSchema);
