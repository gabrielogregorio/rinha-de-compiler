"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const interpreter_1 = require("./interpreter");
const readAst_1 = require("./readAst");
(0, interpreter_1.interpreter)((0, readAst_1.readAst)('/var/rinha/source.rinha.json').expression, {});
