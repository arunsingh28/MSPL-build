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
const fetchClient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const myClient = yield emp_model_1.default.findById(req.params.id).populate('myClient').exec();
    if (myClient) {
        return res.status(200).json({ success: true, myClient: myClient.myClient });
    }
    return res.status(404).json({ success: false, message: 'Nutrition not found' });
});
const attachClient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
});
const updateClient = (req, res) => __awaiter(void 0, void 0, void 0, function* () { });
const deleteClient = (req, res) => __awaiter(void 0, void 0, void 0, function* () { });
exports.default = {
    fetchClient,
    attachClient,
    updateClient,
    deleteClient
};
