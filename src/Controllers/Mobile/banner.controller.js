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
const mobile_banner_model_1 = __importDefault(require("../../Models/mobile.banner.model"));
const aws_s3_1 = require("../../services/aws.s3");
const removeFile_1 = __importDefault(require("../../Utils/removeFile"));
const uploadBanner = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    let banner;
    try {
        banner = yield (0, aws_s3_1.uploadFile)(req.file);
        // remove the file from server
        (0, removeFile_1.default)((_a = req.file) === null || _a === void 0 ? void 0 : _a.path);
        console.log({ banner });
        const bannerData = new mobile_banner_model_1.default({
            bannerImage: {
                location: banner === null || banner === void 0 ? void 0 : banner.location,
                key: banner === null || banner === void 0 ? void 0 : banner.key,
            },
            bannerkey: req.query.key
        });
        yield bannerData.save();
        res.status(200).json({ success: true, message: 'Banner uploaded successfully' });
    }
    catch (err) {
        if (err.code === 11000) {
            const isDelete = yield (0, aws_s3_1.deleteFile)(banner.key);
            return res.status(400).json({ success: false, message: 'Banner already exists' });
        }
        res.status(500).json({ success: false, message: err.message });
    }
});
const getBanner = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const banner = yield mobile_banner_model_1.default.find();
        res.status(200).json({ success: true, data: banner });
    }
    catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});
exports.default = { uploadBanner, getBanner };
