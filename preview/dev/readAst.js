"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readAst = void 0;
const fs_1 = __importDefault(require("fs"));
const readAst = (path) => JSON.parse(fs_1.default.readFileSync(path));
exports.readAst = readAst;
