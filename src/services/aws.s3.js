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
exports.deleteFile = exports.uploadFile = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const client_s3_2 = require("@aws-sdk/client-s3");
const uuid_1 = require("uuid");
const sharp_1 = __importDefault(require("sharp"));
const s3Credentials = {
    forcePathStyle: false,
    endpoint: 'https://sgp1.digitaloceanspaces.com',
    region: 'us-east-1',
    credentials: {
        accessKeyId: 'DO00ATPRN4T6WMGCZW4T',
        secretAccessKey: 'lcwO4/OTZSprI4Aw+JttI/wdglSEL5/CCAKOUfIHRQI',
    }
};
const s3 = new client_s3_1.S3(s3Credentials);
const renameFile = () => {
    const newFileName = `${Date.now()}.${(0, uuid_1.v4)()}.${'webp'}`;
    return newFileName;
};
const uploadFile = (file) => __awaiter(void 0, void 0, void 0, function* () {
    const sharpImage = (0, sharp_1.default)(file.path).rotate().resize(500, 500).toFormat('webp').jpeg({ quality: 80 });
    const buffer = yield sharpImage.toBuffer();
    const fileName = renameFile();
    // create buffer from file
    const params = {
        Bucket: 'sg3storage',
        Key: fileName,
        Body: buffer,
        ACL: 'public-read'
    };
    try {
        const data = yield s3.send(new client_s3_2.PutObjectCommand(params));
        if (data) {
            return {
                location: `https://sg3storage.sgp1.digitaloceanspaces.com/${fileName}`,
                key: fileName
            };
        }
        return false;
    }
    catch (error) {
        console.log({ error });
        return error;
    }
});
exports.uploadFile = uploadFile;
const deleteFile = (key) => __awaiter(void 0, void 0, void 0, function* () {
    const params = {
        Bucket: 'sg3storage',
        Key: key
    };
    try {
        const data = yield s3.send(new client_s3_2.DeleteObjectCommand(params));
        if (data)
            return true;
        return false;
    }
    catch (error) {
        return error;
    }
});
exports.deleteFile = deleteFile;
