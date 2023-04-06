"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sportsListDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const sportsListSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        location: {
            type: String,
            required: true
        },
        key: {
            type: String,
            required: true
        }
    },
    status: {
        type: Boolean,
        required: true,
        default: true
    },
    timestamps: {
        type: Date,
        default: Date.now,
        required: true
    }
});
exports.sportsListDB = mongoose_1.default.model('SportsList', sportsListSchema);
