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
const emp_model_1 = __importDefault(require("../Models/emp.model"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = __importDefault(require("../../config/env"));
const tokens_1 = __importDefault(require("../Utils/tokens"));
const handleRefreshToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('cookies:', req.cookies.rf_session);
    const refreshToken = req.cookies.rf_session;
    if (!refreshToken)
        return res.status(401).json({ message: 'Access Denied' });
    try {
        const verified = jsonwebtoken_1.default.verify(refreshToken, env_1.default._jwt_refresh_token_secret_key);
        const user = yield emp_model_1.default.findById(verified.id).exec();
        if (!user)
            return res.status(401).json({ message: 'Access Denied' });
        const accessToken = tokens_1.default.accessToken(user._id, user.role);
        res.cookie('rf_session', accessToken, { httpOnly: true });
        res.json({ accessToken });
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
});
exports.default = handleRefreshToken;
