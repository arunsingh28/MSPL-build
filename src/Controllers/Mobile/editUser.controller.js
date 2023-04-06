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
const user_model_1 = __importDefault(require("../../Models/user.model"));
const updateUserProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_model_1.default.findById(req.params.id);
        if (user) {
            user.measurement = {
                height: req.body.height,
                weight: req.body.weight,
            };
            user.academy = req.body.academy;
            user.language = req.body.language;
            user.email = req.body.email;
            const updatedUser = yield user.save();
            res.status(200).json({ success: true, data: updatedUser });
        }
        else {
            res.status(404).json({ success: false, message: "User not found" });
        }
    }
    catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});
exports.default = { updateUserProfile };
