"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var morgan_1 = __importDefault(require("morgan"));
var error_middleware_1 = __importDefault(require("./middleware/error.middleware"));
var configEnv_1 = __importDefault(require("./configEnv"));
var routes_1 = __importDefault(require("./routes"));
var PORT = configEnv_1["default"].PORT || 3000;
var app = (0, express_1["default"])();
app.use(express_1["default"].json());
app.use((0, morgan_1["default"])('common'));
app.use('/api', routes_1["default"]);
app.use(error_middleware_1["default"]);
app.listen(PORT, function () {
    console.log("Server running on port ".concat(PORT));
});
exports["default"] = app;
