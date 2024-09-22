"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var pg_1 = require("pg");
var configEnv_1 = __importDefault(require("../configEnv"));
var pool = new pg_1.Pool({
    host: configEnv_1["default"].HOST,
    port: parseInt(configEnv_1["default"].DBPORT),
    database: configEnv_1["default"].DATABASE,
    user: configEnv_1["default"].USER,
    password: configEnv_1["default"].PASSWORD
});
exports["default"] = pool;
