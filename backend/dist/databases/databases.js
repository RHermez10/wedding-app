"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.photos = exports.accounts = void 0;
const nedb = require('nedb-promise');
// DATABASES
exports.accounts = new nedb({
    filename: "./databases/accounts.db",
    autoload: true
});
exports.photos = new nedb({
    filename: "./databases/photos.db",
    autoload: true
});
;
;
;
;
