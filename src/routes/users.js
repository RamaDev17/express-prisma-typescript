"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_controller_1 = require("../controllers/users.controller");
const router = express_1.default.Router();
//CREATE
router.post('/', users_controller_1.postUser);
//READ
router.get('/', users_controller_1.getAllUser);
// UPDATE
router.patch('/:id', users_controller_1.updateUser);
// DELETE
router.delete('/:id', users_controller_1.deleteUser);
exports.default = router;
