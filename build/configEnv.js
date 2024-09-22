"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1["default"].config();
var _a = process.env, PORT = _a.PORT, DB_ENV = _a.DB_ENV, POSTGRES_HOST = _a.POSTGRES_HOST, POSTGRES_PORT = _a.POSTGRES_PORT, POSTGRES_DB = _a.POSTGRES_DB, POSTGRES_DB_TEST = _a.POSTGRES_DB_TEST, POSTGRES_USER = _a.POSTGRES_USER, POSTGRES_PASSWORD = _a.POSTGRES_PASSWORD, BCRYPT_PASSWORD = _a.BCRYPT_PASSWORD, SALT_ROUNDS = _a.SALT_ROUNDS, TOKEN_SECRET = _a.TOKEN_SECRET;
exports["default"] = {
    PORT: PORT,
    HOST: POSTGRES_HOST,
    DBPORT: POSTGRES_PORT,
    DATABASE: DB_ENV === 'dev' ? POSTGRES_DB : POSTGRES_DB_TEST,
    USER: POSTGRES_USER,
    PASSWORD: POSTGRES_PASSWORD,
    BCRYPT: BCRYPT_PASSWORD,
    SALT: SALT_ROUNDS,
    TOKEN_SECRET: TOKEN_SECRET
};
