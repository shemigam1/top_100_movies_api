"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
const config_1 = __importDefault(require("../helpers/config"));
class Logger {
    constructor() {
        this.logger = (0, winston_1.createLogger)({
            transports: [
                new winston_1.transports.Console({ silent: config_1.default.nodeEnv === 'test' }),
                new winston_1.transports.File({ filename: 'error.log', level: 'error' }),
                new winston_1.transports.File({ filename: 'combined.log' }),
            ],
            format: winston_1.format.combine(winston_1.format.timestamp({
                format: 'YYYY-MM-DD HH:mm:ss',
            }), winston_1.format.errors({ stack: true }), winston_1.format.padLevels(), winston_1.format.printf((info) => winston_1.format
                .colorize()
                .colorize(info.level, `${info.timestamp} ${info.level.toUpperCase()}: ${info.message}`))),
        });
        (0, winston_1.addColors)({
            error: 'bold red',
            warn: 'bold yellow',
            info: 'bold cyan',
            debug: 'bold green',
        });
    }
}
exports.default = Logger;
