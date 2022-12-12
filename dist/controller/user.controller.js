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
exports.getSessionHandler = exports.getConsultantHandler = exports.getAllConsultantHandler = void 0;
const db_1 = require("../config/db");
const getAllConsultantHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const consultants = yield db_1.prisma.consultant.findMany({
        include: {
            user: {
                select: {
                    username: true,
                }
            }
        }
    });
    // const username = await prisma.user.findMany();
    return res.status(200).json(consultants);
    //  return res.status(200).json(username);
});
exports.getAllConsultantHandler = getAllConsultantHandler;
const getConsultantHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const user = res.locals.user as Consultant;
    const { user_id } = req.params;
    const consultant = yield db_1.prisma.consultant.findUnique({
        where: { user_id: user_id },
        include: {
            user: {
                select: {
                    username: true,
                }
            }
        }
    });
    return res.status(200).json(consultant);
});
exports.getConsultantHandler = getConsultantHandler;
const getSessionHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const user = res.locals.user as Consultant;
    const { investor_id } = req.params;
    const session = yield db_1.prisma.consultant.findUnique({
        where: { user_id: investor_id },
        include: {
            user: {
                select: {
                    username: true,
                }
            }
        }
    });
    return res.status(200).json(session);
});
exports.getSessionHandler = getSessionHandler;
