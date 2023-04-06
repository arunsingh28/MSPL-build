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
Object.defineProperty(exports, "__esModule", { value: true });
const BMI = (weight, height) => __awaiter(void 0, void 0, void 0, function* () {
    const BMI = weight / (height / 100 * height / 100);
    return BMI;
});
// bmr
const BMR = (gender, weight, height, age) => __awaiter(void 0, void 0, void 0, function* () {
    // convert age to years
    const today = new Date();
    const birthDate = new Date(age);
    age = today.getFullYear() - birthDate.getFullYear();
    if (gender === 'Male' || gender === 'male') {
        // male bmr
        const BMR = 10 * weight + 6.25 * height - 5 * age + 5;
        return BMR;
    }
    else {
        // for female
        const BMR = 10 * weight + 6.25 * height - 5 * age - 161;
        return BMR;
    }
});
exports.default = { BMI, BMR };
