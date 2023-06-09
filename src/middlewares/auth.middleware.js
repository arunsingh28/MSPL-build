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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const emp_model_1 = __importDefault(require("../Models/emp.model"));
const logedin_model_1 = __importDefault(require("../Models/logedin.model"));
const env_1 = __importDefault(require("../../config/env"));
const authorization = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }
    // token not found in header
    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Token not found'
        });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, env_1.default._jwt_access_token_secret_key);
        const isAuth = yield logedin_model_1.default.findOne({ user: decoded.id }).exec();
        if (isAuth) {
            if (isAuth.isLoggedin === false) {
                return res.status(203).json({
                    success: false,
                    message: 'session out'
                });
            }
        }
        const user = yield emp_model_1.default.findById(decoded.id).exec();
        if (!user) {
            return res.status(203).json({
                success: false,
                message: 'user not found'
            });
        }
        else {
            // pass to other function
            /*
             create new session with current user
            */
            next();
        }
    }
    catch (error) {
        console.log(error);
        return res.status(401).json({
            success: false,
            message: "Unauthorized",
            error: error.message
        });
    }
});
exports.default = authorization;
