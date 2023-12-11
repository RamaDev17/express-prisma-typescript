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
exports.login = exports.register = void 0;
const client_1 = require("@prisma/client");
const uuid_1 = require("uuid");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const process_1 = require("process");
const prisma = new client_1.PrismaClient();
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    const hashedPassword = yield bcrypt_1.default.hash(password, 10);
    try {
        const result = yield prisma.users.create({
            data: {
                id: (0, uuid_1.v4)(),
                name,
                email,
                password: hashedPassword
            }
        });
        res.status(201).json({ message: 'User Creates', data: result });
    }
    catch (error) {
        res.status(500).json({
            message: "Server error",
            error
        });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield prisma.users.findUnique({
        where: {
            email: email
        }
    });
    if (!user) {
        return res.status(404).json({ message: "user not found" });
    }
    if (!(user === null || user === void 0 ? void 0 : user.password)) {
        return res.status(404).json({ message: "Password not set" });
    }
    const isPasswordValid = yield bcrypt_1.default.compare(password, user === null || user === void 0 ? void 0 : user.password);
    if (isPasswordValid) {
        const payload = {
            id: user.id,
            email: user.email,
            name: user.name
        };
        const secret = process_1.env.JWT_SECRET;
        const expiresIn = 60 * 60 * 1;
        const token = jsonwebtoken_1.default.sign(payload, secret, { expiresIn: expiresIn });
        return res.json({
            message: "login success",
            data: {
                id: user.id,
                email: user.email,
                name: user.name
            },
            token
        });
    }
    else {
        return res.status(404).json({ message: "Wrong password" });
    }
});
exports.login = login;
