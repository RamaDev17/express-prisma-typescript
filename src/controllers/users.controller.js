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
exports.deleteUser = exports.updateUser = exports.postUser = exports.getAllUser = void 0;
const client_1 = require("@prisma/client");
const uuid_1 = require("uuid");
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma = new client_1.PrismaClient();
const postUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
exports.postUser = postUser;
const getAllUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield prisma.users.findMany();
        res.json({ message: 'Users List', data: result });
    }
    catch (error) {
        res.status(500).json({
            message: "Server error",
            error
        });
    }
});
exports.getAllUser = getAllUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, email, password, is_verified } = req.body;
    try {
        const result = yield prisma.users.update({
            data: {
                name,
                password,
                is_verified
            },
            where: {
                id: id
            }
        });
        res.json({ message: `User ${id} updated`, data: result });
    }
    catch (error) {
        res.status(500).json({
            message: "Server error",
            error
        });
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield prisma.users.delete({
            where: { id: id }
        });
        res.json({ message: `User ${id} deleted` });
    }
    catch (error) {
        res.status(500).json({
            message: "Server error",
            error
        });
    }
});
exports.deleteUser = deleteUser;
