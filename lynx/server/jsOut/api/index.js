"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const flats_1 = __importDefault(require("./flats"));
const initApis = (app) => {
    (0, flats_1.default)(app);
    return app;
};
exports.default = initApis;
