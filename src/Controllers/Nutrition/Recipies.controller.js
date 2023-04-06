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
const recipies_model_1 = __importDefault(require("../../Models/recipies.model"));
const aws_s3_1 = require("../../services/aws.s3");
const removeFile_1 = __importDefault(require("../../Utils/removeFile"));
const saveNewRecipie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    // parse the data
    const data = JSON.parse(req.body.data);
    const upload = yield (0, aws_s3_1.uploadFile)(req.file);
    console.log({ upload });
    // remove the file from server
    (0, removeFile_1.default)((_a = req.file) === null || _a === void 0 ? void 0 : _a.path);
    // create object
    const recipe = {
        name: data.name,
        ingredients: data.ingredients,
        tags: data.tags,
        preparationTime: data.preparationTime,
        status: data.status,
        sourceLink: data.sourceLink,
        nutritionName: data.nutritionName,
        image: {
            location: upload.location,
            key: upload.key
        }
    };
    try {
        yield recipies_model_1.default.create(recipe);
        return res.status(201).json({ success: true, message: 'Recipi Save' });
    }
    catch (err) {
        return res.status(200).json({ message: err.message, success: false });
    }
});
const getRecipe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const recipe = yield recipies_model_1.default.find({});
        return res.status(200).json({ success: true, recipe });
    }
    catch (err) {
        return res.status(200).json({ message: err.message, success: false });
    }
});
// delete recipe
const deleteRecipe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isRecipe = yield recipies_model_1.default.findById(req.params.id).exec();
        const isDelete = yield (0, aws_s3_1.deleteFile)(isRecipe === null || isRecipe === void 0 ? void 0 : isRecipe.image.key);
        if (isDelete) {
            yield recipies_model_1.default.findByIdAndDelete(req.params.id);
            return res.status(200).json({ success: true, message: 'Recipe Deleted' });
        }
        else {
            return res.status(401).json({ success: false, message: 'Error in deleting file' });
        }
    }
    catch (err) {
        return res.status(200).json({ message: err.message, success: false });
    }
});
// send recipe by id
const getRecipeById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const recipe = yield recipies_model_1.default.findById(req.params.id);
        return res.status(200).json({ success: true, recipe });
    }
    catch (err) {
        return res.status(200).json({ message: err.message, success: false });
    }
});
const updateRecipe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    // parse the data
    const data = JSON.parse(req.body.data);
    let upload;
    const isNewImg = req.body.isNewFile === 'true' ? true : false;
    const isRecipe = yield recipies_model_1.default.findById(req.body.id).exec();
    if (!isNewImg) {
        const recipe = {
            name: data.name,
            ingredients: data.ingredients,
            tags: data.tags,
            preparationTime: data.preparationTime,
            status: data.status,
            sourceLink: data.sourceLink,
            nutritionName: data.nutritionName,
            image: {
                location: isRecipe === null || isRecipe === void 0 ? void 0 : isRecipe.image.location,
                key: isRecipe === null || isRecipe === void 0 ? void 0 : isRecipe.image.key
            }
        };
        try {
            yield recipies_model_1.default.findByIdAndUpdate(req.body.id, { recipe }).exec();
            return res.status(201).json({ success: true, message: 'Recipi Updated true' });
        }
        catch (err) {
            return res.status(200).json({ message: err.message, success: false });
        }
    }
    else {
        upload = yield (0, aws_s3_1.uploadFile)(req.file);
        // remove the file from server
        (0, removeFile_1.default)((_b = req.file) === null || _b === void 0 ? void 0 : _b.path);
        const isDelete = yield (0, aws_s3_1.deleteFile)(req.body.key);
        if (!isDelete)
            return res.status(200).json({ message: 'Error in updating file', success: false });
        const recipe = {
            name: data.name,
            ingredients: data.ingredients,
            tags: data.tags,
            preparationTime: data.preparationTime,
            status: data.status,
            sourceLink: data.sourceLink,
            nutritionName: data.nutritionName,
            image: {
                location: upload.location,
                key: upload.key
            }
        };
        try {
            yield recipies_model_1.default.findByIdAndUpdate(req.body.id, recipe);
            return res.status(201).json({ success: true, message: 'Recipi Updated' });
        }
        catch (err) {
            return res.status(200).json({ message: err.message, success: false });
        }
    }
});
exports.default = { saveNewRecipie, getRecipe, deleteRecipe, getRecipeById, updateRecipe };
