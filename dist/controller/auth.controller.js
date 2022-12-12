"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.RegisterHandler = exports.LoginHandler = void 0;
const client_1 = require("@prisma/client");
const argon2 = __importStar(require("argon2"));
const jwt = __importStar(require("jsonwebtoken"));
const db_1 = require("../config/db");
const LoginHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield db_1.prisma.user.findFirst({
        where: { email },
    });
    if (!user) {
        return res.status(400).json({
            message: 'كلمة المرور أو البريد الالكتروني  خاطىء',
        });
    }
    const isMatched = yield argon2.verify(user.password, password);
    if (!isMatched) {
        return res.status(400).json({
            message: 'كلمة المرور أو البريد الالكتروني  خاطىء',
        });
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
    return res.status(200).json({
        message: '' + user.username + ' مرحبا بك ',
        token,
    });
});
exports.LoginHandler = LoginHandler;
const RegisterHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password, email, phone, AboutMe, certificate, filed, role } = req.body;
        const hashedPassword = yield argon2.hash(password);
        if (role == client_1.Role.Investor) {
            yield db_1.prisma.user.create({
                data: {
                    username,
                    email,
                    password,
                    role,
                },
            });
            yield db_1.prisma.consultant.create({
                data: {
                    phone,
                    AboutMe,
                    certificate,
                    filed,
                },
            });
        }
        return res.status(201).json({
            message: "تم التسجيل بنجاح !",
        });
    }
    catch (error) {
        // console.log(error.message)
        return res.status(400).json({ message: 'Issue with your input' });
    }
});
exports.RegisterHandler = RegisterHandler;
