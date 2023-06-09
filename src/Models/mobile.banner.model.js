"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mobileBannerSchema = new mongoose_1.default.Schema({
    bannerImage: {
        type: {
            location: { type: String },
            key: { type: String }
        },
    },
    bannerkey: { type: String, default: null, unique: true }
});
exports.default = mongoose_1.default.model('MobileBanner', mobileBannerSchema);
