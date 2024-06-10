"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const middleware_1 = require("./middleware/middleware");
const user_route_1 = require("./app/modules/user/user.route");
const app = (0, express_1.default)();
//parser
app.use(express_1.default.json());
app.use((0, cors_1.default)());
/*---------------- MIDDLEWARES -----------------------*/
// app.use(middlewares.logger);
/*------------ APPLICATION ROUTES -------------------*/
app.use('/api/users', user_route_1.UserRoutes);
/*--------------------------TEST --------------------*/
app.get('/', (req, res, next) => {
    try {
        res.send('Hello to my user and order management project!');
    }
    catch (error) {
        next(error);
    }
});
/**------------ GLOBAL ERROR HANDLER -------------------*/
app.use(middleware_1.middlewares.errorHandler);
/** ------------ NOT FOUND URL ------------------- */
app.all('*', (req, res) => {
    res.status(404).json({
        success: false,
        urlName: req.url,
        message: 'URL Not found',
    });
});
exports.default = app;
