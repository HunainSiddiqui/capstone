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
exports.bailRouter = void 0;
const db_1 = require("../db");
const express_1 = require("express");
const middleware_1 = require("../middleware");
const router = (0, express_1.Router)();
exports.bailRouter = router;
router.get("/", middleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bails = yield db_1.prismaClient.applicant.findMany();
    res.json(bails);
}));
router.get("/:id", middleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const bail = yield db_1.prismaClient.applicant.findUnique({
        where: {
            id: parseInt(id),
        },
    });
    res.json(bail);
}));
router.post("/", middleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const { applicantName, email, caseNumber, address, additionalInfo, file } = body;
    const bail = yield db_1.prismaClient.applicant.create({
        data: {
            applicantName,
            email,
            caseNumber,
            address,
            additionalInfo,
            file,
        },
    });
    res.json(bail);
}));
