"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const config_1 = __importDefault(require("../helpers/config"));
//create connection and export as a singleton
(0, mongoose_1.connect)(config_1.default.DATABASE_URL, {})
    .then(() => {
    console.log('Connected to MongoDB');
})
    .catch((err) => {
    console.error('Error connecting to MongoDB', err);
});
const conn = mongoose_1.connection;
exports.default = conn;
