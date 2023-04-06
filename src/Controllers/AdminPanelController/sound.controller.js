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
const updateSoundSetting = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = req.params;
    try {
        const isUser = yield emp_model_1.default.findOne({ _id }).exec();
        if (!isUser) {
            return res.json({ success: false, message: 'User not found' });
        }
        isUser.isMute.loginNotification = req.body.loginNotification;
        isUser.isMute.logoutNotification = req.body.logoutNotification;
        isUser.isMute.deleteNotification = req.body.deleteNotification;
        yield isUser.save();
        return res.json({ success: true, message: 'Sound setting updated' });
    }
    catch (error) {
        console.log(error);
        // return res.status(500).json({ message: 'Internal server error', success: false, statusCode: res.statusCode })
        return res.json({ success: false, message: 'Something went wrong' });
    }
});
const sendSoundSetting = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = req.params;
    try {
        const isSoundNotification = yield emp_model_1.default.findOne({ _id }).exec();
        if (!isSoundNotification) {
            return res.json({ success: false, message: 'User not found' });
        }
        return res.json({ success: true, message: 'Sound setting', data: isSoundNotification.isMute });
    }
    catch (error) {
        console.log(error);
        return res.json({ success: false, message: 'Something went wrong' });
    }
});
exports.default = { updateSoundSetting, sendSoundSetting };
