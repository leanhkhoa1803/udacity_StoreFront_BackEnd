"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.validateTokenMiddleware = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var configEnv_1 = __importDefault(require("../configEnv"));
var handleUnauthorizedError = function (next) {
    var error = new Error('Login Error, Please login again');
    error.status = 401;
    next(error);
};
var validateTokenMiddleware = function (req, res, next) {
    try {
        var authHeader = req.get('Authorization');
        if (authHeader) {
            var bearer = authHeader.split(' ')[0].toLowerCase();
            var token = authHeader.split(' ')[1];
            if (token && bearer === 'bearer') {
                var decode = jsonwebtoken_1["default"].verify(token, configEnv_1["default"].BCRYPT);
                if (decode) {
                    next();
                }
                else {
                    handleUnauthorizedError(next);
                }
            }
            else {
                handleUnauthorizedError(next);
            }
        }
        else {
            handleUnauthorizedError(next);
        }
    }
    catch (error) {
        handleUnauthorizedError(next);
    }
};
exports.validateTokenMiddleware = validateTokenMiddleware;
exports["default"] = exports.validateTokenMiddleware;
