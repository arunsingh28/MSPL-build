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
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        // required: true,
    },
    email: {
        type: String,
        default: null
        // required: true,
    },
    profileTimeline: {
        type: String,
    },
    phone: {
        type: Number,
        required: true,
        unique: true,
    },
    BMI: {
        type: Number,
        default: 0
    },
    BMR: {
        type: Number,
        default: 0
    },
    gender: {
        type: String,
        // required: true,
    },
    profileImage: {
        location: {
            type: String,
            default: null,
        },
        key: {
            type: String,
            default: null,
        },
    },
    nutritionist: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'emp',
        default: null
    },
    nutritionData: {
        dietStatus: {
            type: Boolean,
            default: false
        },
        lastAssisted: {
            type: Date,
            default: null
        },
        nextAssisted: {
            type: Date,
            default: null
        },
        dietPlan: {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'package',
            default: null
        },
        dietPlanName: {
            type: String,
            default: null
        },
        weekReport: {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'weekReport',
            default: null
        },
    },
    academy: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Academy',
        default: null
    },
    language: {
        type: String,
        default: "en"
    },
    waterIntake: {
        type: Number,
        default: 0
    },
    referal_code: String,
    dob: Date,
    measurement: {
        height: Number,
        weight: Number,
    },
    // bca: mongoose.Schema.Types.ObjectId,
    isPaid: {
        type: Boolean,
        default: false,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    isBlocked: {
        type: Boolean,
        default: false,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
    planType: String,
    otp: Number,
    oldOtp: Number,
}, { timestamps: true });
// save hook
userSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this;
        // set randmon referral code
        user.referal_code = Math.random().toString(36).substr(5);
        // place default genrated value to otp
        user.otp = Math.floor(100000 + Math.random() * 900000);
        user.oldOtp = Math.floor(100000 + Math.random() * 900000);
        // encrypt the password
        // user.password = await bcrypt.hash(user.password, bcrypt.genSaltSync(10))
        return next();
    });
});
const userModel = mongoose_1.default.model("User", userSchema);
exports.default = userModel;
