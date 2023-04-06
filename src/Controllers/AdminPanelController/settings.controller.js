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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = __importDefault(require("../../../config/env"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const verifyLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { token } = req.params;
    if (!token)
        return res.json({ success: true });
    try {
        const decoded = jsonwebtoken_1.default.verify(token, env_1.default._jwt_access_token_secret_key);
        const user = yield emp_model_1.default.findById(decoded.id).exec();
        if (user) {
            return res.json({
                user: {
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    _id: user._id
                },
                token,
                success: true,
            });
        }
        return res.json({ success: true });
    }
    catch (error) {
        return res.json({ success: true });
    }
});
const changePassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = req.params;
    const isEmp = yield emp_model_1.default.findOne({ _id }).exec();
    const isMatch = yield bcrypt_1.default.compare(req.body.oldPassword, isEmp.password);
    if (!isMatch) {
        return res.json({ message: 'old password is incorrect', success: false });
    }
    else {
        const decrpt = yield bcrypt_1.default.hash(req.body.newPassword, 10);
        const update = yield emp_model_1.default.findByIdAndUpdate(_id, { password: decrpt }).exec();
        if (update) {
            return res.json({ message: 'password change successfully', success: true });
        }
        else {
            return res.json({ message: 'something went wrong', success: false });
        }
    }
});
exports.default = { verifyLogin, changePassword };
