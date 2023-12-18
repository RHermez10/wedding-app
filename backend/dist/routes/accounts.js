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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bcrypt_1 = require("../bcrypt");
const databases_1 = require("../databases/databases");
// CREATE ACCOUNTS ROUTER
const router = express_1.default.Router();
// POST SIGNUP
router.post('/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const credentials = req.body;
    let resObj = {
        success: true,
    };
    // check if username already exists in database
    const usernameExist = yield databases_1.accounts.find({
        username: credentials.username
    });
    // if username exists, set success = false
    if (usernameExist.length > 0) {
        resObj.success = false;
    }
    else { // if username is available ...
        // hash password 
        const hashedPassword = yield (0, bcrypt_1.hashPassword)(credentials.password);
        // update credentials object
        credentials.password = hashedPassword;
        // insert into database
        databases_1.accounts.insert(credentials);
    }
    ;
    res.json(resObj);
}));
// POST LOGIN
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const login = req.body;
    let resObj = {
        success: false,
    };
    // check if account with provided username exists
    const account = yield databases_1.accounts.find({
        username: login.username
    });
    // if it does, check if provided password matches with account password
    if (account.length > 0) {
        const correctPassword = yield (0, bcrypt_1.comparePassword)(login.password, account[0].password);
        if (correctPassword) {
            resObj.success = true;
        }
    }
    res.json(resObj);
}));
module.exports = router;
