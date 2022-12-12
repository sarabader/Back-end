"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("./config/db");
require("dotenv/config");
const auth_routes_1 = __importDefault(require("./route/auth.routes"));
const user_route_1 = __importDefault(require("./route/user.route"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
(0, db_1.connectDB)();
app.use('/api/v1/auth', auth_routes_1.default);
app.use('/api/v1/consultant', user_route_1.default);
app.use((req, res, next) => {
    return res.status(404).json({
        message: 'Route not found ! ',
    });
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log('Server is running in port 5000');
});
