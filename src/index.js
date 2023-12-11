"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const process_1 = require("process");
const middleware_1 = require("./middleware");
const users_1 = __importDefault(require("./routes/users"));
const auth_1 = __importDefault(require("./routes/auth"));
const app = (0, express_1.default)();
const PORT = process_1.env.PORT;
//middleware
app.use(express_1.default.json());
app.use(middleware_1.logRequest);
//app
app.use('/', auth_1.default);
app.use('/users', middleware_1.accessValidation, users_1.default);
//SERVER
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
