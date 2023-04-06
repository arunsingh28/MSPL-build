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
const sportsList_model_1 = require("../../Models/sportsList.model");
const aws_s3_1 = require("../../services/aws.s3");
const removeFile_1 = __importDefault(require("../../Utils/removeFile"));
const saveSportsList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const upload = yield (0, aws_s3_1.uploadFile)(req.file);
        (0, removeFile_1.default)((_a = req.file) === null || _a === void 0 ? void 0 : _a.path);
        if (upload) {
            req.body.image = upload.location;
            req.body.key = upload.key;
        }
        else {
            (0, aws_s3_1.deleteFile)(req.body.key);
            return res.status(500).json({ message: 'Something went wrong', success: false, statusCode: res.statusCode });
        }
        const sportsList = yield sportsList_model_1.sportsListDB.create({
            name: req.body.name,
            image: {
                location: req.body.image,
                key: req.body.key
            }
        });
        res.status(200).json({ sportsList, success: true, statusCode: res.statusCode });
    }
    catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ message: 'This sportsList already exists', success: false, statusCode: res.statusCode });
        }
        res.status(500).json({ message: error.message, success: false, statusCode: res.statusCode });
    }
});
const updateSportsList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const upload = yield (0, aws_s3_1.uploadFile)(req.file);
        (0, removeFile_1.default)((_b = req.file) === null || _b === void 0 ? void 0 : _b.path);
        if (upload) {
            req.body.image = upload.location;
            req.body.key = upload.key;
        }
        else {
            (0, aws_s3_1.deleteFile)(req.body.key);
            return res.status(500).json({ message: 'Something went wrong', success: false, statusCode: res.statusCode });
        }
        const sportsList = yield sportsList_model_1.sportsListDB.findByIdAndUpdate(req.params.id, {
            $set: {
                name: req.body.name,
                image: {
                    location: req.body.image,
                    key: req.body.key
                }
            }
        }, { new: true });
        res.status(200).json({ sportsList, success: true, statusCode: res.statusCode });
    }
    catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ message: 'This sportsList already exists', success: false, statusCode: res.statusCode });
        }
        res.status(500).json({ message: error.message, success: false, statusCode: res.statusCode });
    }
});
const deleteSportsList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sportsList = yield sportsList_model_1.sportsListDB.findByIdAndDelete(req.params.id);
        if (sportsList) {
            (0, aws_s3_1.deleteFile)(sportsList.image.key);
        }
        res.status(200).json({ sportsList, success: true, statusCode: res.statusCode });
    }
    catch (error) {
        res.status(500).json({ message: error.message, success: false, statusCode: res.statusCode });
    }
});
const sportsList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sportsList = yield sportsList_model_1.sportsListDB.find();
        res.status(200).json({ sportsList });
    }
    catch (error) {
        res.status(500).json({ error });
    }
});
exports.default = { sportsList, saveSportsList, updateSportsList, deleteSportsList };
