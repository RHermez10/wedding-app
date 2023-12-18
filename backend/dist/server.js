"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
// import routers
const gallery = require('./routes/gallery');
const accounts = require('./routes/accounts');
// create app
const app = (0, express_1.default)();
const PORT = 1337;
// middleware
app.use((0, cors_1.default)({ origin: '*' }));
app.use(express_1.default.json());
// GALLERY ROUTER
app.use('/gallery', gallery);
// ACCOUNTS ROUTER
app.use('/accounts', accounts);
// start server
app.listen(PORT, () => {
    console.log('Server now running on port ', PORT);
});
