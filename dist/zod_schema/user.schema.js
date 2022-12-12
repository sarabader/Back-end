"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSessionSchema = exports.getConsultantSchema = void 0;
const zod_1 = require("zod");
exports.getConsultantSchema = zod_1.z.object({
    params: zod_1.z.object({
        user_id: zod_1.z.string({ invalid_type_error: "Id must be string" }),
    }),
});
exports.getSessionSchema = zod_1.z.object({
    params: zod_1.z.object({
        investor_id: zod_1.z.string({ invalid_type_error: "Id must be string" }),
    }),
});
