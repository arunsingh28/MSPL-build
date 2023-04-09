"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_session_1 = __importDefault(require("express-session"));
function default_1(app) {
    app.use((0, express_session_1.default)({
        name: 'sessionInfo',
        secret: 'connectionid',
        proxy: true,
        resave: false,
        saveUninitialized: true,
        cookie: {
            // sameSite: 'none',
            // domain: '.google.com',
            maxAge: 24 * 60 * 60 * 1000
        }
    }));
    app.set('trust proxy', 1);
}
exports.default = default_1;
