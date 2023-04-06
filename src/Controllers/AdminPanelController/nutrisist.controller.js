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
const emp_model_1 = __importDefault(require("../../Models/emp.model"));
const user_model_1 = __importDefault(require("../../Models/user.model"));
const aws_s3_1 = require("../../services/aws.s3");
const removeFile_1 = __importDefault(require("../../Utils/removeFile"));
const updateProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const data = JSON.parse(req.body.data);
    if (data.change) {
        // profile change
        try {
            // delete old profile from the aws s3
            yield (0, aws_s3_1.deleteFile)(data.key);
            const isUpload = yield (0, aws_s3_1.uploadFile)(req.file);
            // remove the file from server
            (0, removeFile_1.default)((_a = req.file) === null || _a === void 0 ? void 0 : _a.path);
            if (isUpload) {
                const update = {
                    profile: {
                        profileImage: {
                            location: isUpload.location,
                            key: isUpload.key
                        },
                        bio: data.bio,
                        experience: parseInt(data.exprience),
                        language: data.language,
                        education: data.education,
                        specialisation: data.specialist,
                    }
                };
                // qualification: data.qualification,
                try {
                    const isDone = yield emp_model_1.default.findByIdAndUpdate(req.params.id, {
                        $set: update
                    }).exec();
                    console.log('isDone', isDone);
                    if (isDone) {
                        return res.status(200).json({ success: true, message: 'Profile Updated' });
                    }
                }
                catch (error) {
                    console.log('error', error);
                    return res.status(404).json({ success: false, message: 'Profile not Updated' });
                }
            }
        }
        catch (err) {
            console.log('error 1', err);
            return res.status(500).json({ message: err.message, success: false });
        }
    }
    else {
        // profile not change
        try {
            const update = {
                profile: {
                    experience: parseInt(data.exprience),
                    language: data.language,
                    specialisation: data.specialist,
                    education: data.education,
                    bio: data.bio,
                    profileImage: {
                        location: data.image.location,
                        key: data.image.key
                    }
                }
            };
            // qualification: data.qualification,
            try {
                const isDone = yield emp_model_1.default.findByIdAndUpdate(req.params.id, {
                    $set: update
                }).exec();
                console.log('isDone', isDone);
                if (isDone) {
                    return res.status(200).json({ success: true, message: 'Profile Updated' });
                }
            }
            catch (error) {
                console.log('error', error);
                return res.status(404).json({ success: false, message: 'Profile not Updated' });
            }
        }
        catch (err) {
            console.log('error 1', err);
            return res.status(500).json({ message: err.message, success: false });
        }
    }
});
// send the nutriotn profile
const getNutritionProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isNutrition = yield emp_model_1.default.findById(req.params.id).exec();
        if (isNutrition) {
            return res.status(200).json({ success: true, profile: isNutrition.profile });
        }
        else {
            return res.status(404).json({ success: false, message: 'Nutrition not found' });
        }
    }
    catch (err) {
        return res.status(500).json({ message: err.message, success: false });
    }
});
// remove image
const removeImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isDeleted = yield (0, aws_s3_1.deleteFile)(req.params.key);
        if (isDeleted) {
            // remove the image from the database
            let temp = yield emp_model_1.default.findById(req.params.id).exec();
            const isDone = yield emp_model_1.default.findByIdAndUpdate(req.params.id, {
                $set: {
                    profile: {
                        profileImage: {
                            location: '',
                            key: ''
                        },
                        bio: temp === null || temp === void 0 ? void 0 : temp.profile.bio,
                        experience: temp === null || temp === void 0 ? void 0 : temp.profile.experience,
                        language: temp === null || temp === void 0 ? void 0 : temp.profile.language,
                        specialisation: temp === null || temp === void 0 ? void 0 : temp.profile.specialisation,
                        education: temp === null || temp === void 0 ? void 0 : temp.profile.education,
                    }
                }
            }).exec();
            if (!isDone)
                return res.status(404).json({ success: false, message: 'Image not Deleted' });
            return res.status(200).json({ success: true, message: 'Image Deleted' });
        }
    }
    catch (err) {
        return res.status(500).json({ message: err.message, success: false });
    }
});
const dietPlanner = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('id', req.params.id);
    console.log('req.body', JSON.stringify(req.body));
});
const attachUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // add the nutritionist to the user
        const isUser = yield user_model_1.default.findByIdAndUpdate(req.params.id, {
            $set: {
                nutritionist: req.body.nutritionist
            }
        }).then((data) => __awaiter(void 0, void 0, void 0, function* () {
            if (data) {
                // add the user to the nutritionist
                const isEmp = yield emp_model_1.default.findByIdAndUpdate(req.params.nutriID, {
                    $push: {
                        myClient: req.params.id
                    }
                });
                if (isEmp) {
                    return res.status(200).json({ success: true, message: 'User attached' });
                }
            }
        }));
        if (!isUser) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
    }
    catch (err) {
        return res.status(500).json({ message: err.message, success: false });
    }
});
exports.default = { updateProfile, getNutritionProfile, removeImage, dietPlanner, attachUser };
