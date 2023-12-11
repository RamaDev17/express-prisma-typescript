"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.accessValidation = exports.logRequest = void 0;
const process_1 = require("process");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const logRequest = (req, res, next) => {
    console.log('Request PATH', req.path);
    next();
};
exports.logRequest = logRequest;
const accessValidation = (req, res, next) => {
    const validationReq = req;
    const { authorization } = validationReq.headers;
    if (!authorization) {
        return res.status(401).json({
            message: 'Token not found'
        });
    }
    const token = authorization.split(' ')[1];
    const secret = process_1.env.JWT_SECRET;
    try {
        const jwtDecode = jsonwebtoken_1.default.verify(token, secret);
        if (typeof jwtDecode !== 'string') {
            validationReq.userData = jwtDecode;
        }
    }
    catch (error) {
        return res.status(401).json({
            message: 'Unauthorized'
        });
    }
    next();
};
exports.accessValidation = accessValidation;
