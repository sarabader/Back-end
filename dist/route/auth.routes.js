"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("../controller/auth.controller");
const validate_1 = __importDefault(require("../middleware/validate"));
const authSchema_1 = require("../zod_schema/authSchema");
const router = express_1.default.Router();
router.post('/register', (0, validate_1.default)(authSchema_1.registerConsultantSchema), auth_controller_1.RegisterHandler);
router.post('/Userregister', (0, validate_1.default)(authSchema_1.registerUserSchema), auth_controller_1.RegisterHandler);
router.post('/login', (0, validate_1.default)(authSchema_1.loginSchema), auth_controller_1.LoginHandler);
exports.default = router;
