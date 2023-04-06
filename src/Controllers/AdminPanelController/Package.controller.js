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
const package_model_1 = __importDefault(require("../../Models/package.model"));
// Save package
const handleSavePackage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { packageData, points } = req.body;
    try {
        yield package_model_1.default.create({
            packageName: packageData.name,
            packagePrice: packageData.price,
            packageDescription: packageData.description,
            packageDuration: packageData.duration,
            packageDurationUnit: packageData.durationUnit,
            packagePoint: points,
            packageChild: packageData === null || packageData === void 0 ? void 0 : packageData.child,
        });
        return res.status(200).json({
            message: 'Package save successfully',
            success: true,
            statusCode: res.statusCode
        });
    }
    catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({
                message: 'Package already exists',
                success: false,
                data: null,
                statusCode: res.statusCode
            });
        }
        return res.status(500).json({
            message: 'Something went wrong',
            success: false,
            data: null,
            statusCode: res.statusCode
        });
    }
});
// Get all packages
const handleGetAllPackages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const packages = yield package_model_1.default.find().exec();
        return res.status(200).json({
            success: true,
            data: packages,
            statusCode: res.statusCode
        });
    }
    catch (error) {
        return res.status(500).json({
            message: 'Something went wrong',
            success: false,
            data: null,
            statusCode: res.statusCode
        });
    }
});
exports.default = { handleSavePackage, handleGetAllPackages };
