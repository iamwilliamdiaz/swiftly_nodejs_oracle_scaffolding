"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const secrets_util_1 = require("./secrets.util");
const winston_1 = __importDefault(require("winston"));
const logger = winston_1.default.createLogger({
    level: "info",
    format: winston_1.default.format.json(),
    defaultMeta: { service: "user-service" },
    transports: [
        new winston_1.default.transports.Console(),
        new winston_1.default.transports.File({ filename: "logs/error.log", level: "error" }),
        new winston_1.default.transports.File({ filename: "logs/combined.log" })
    ]
});
const envTransports = {};
/**
 * Assign the new level of logging
 */
Object.assign(envTransports, { "consoleOptions": { "level": secrets_util_1.LOGLEVEL } });
/**
 * Logger Options
 */
const loggerOptions = {
    "applicationId": secrets_util_1.API_NAME || "",
    "transports": envTransports,
    "environment": secrets_util_1.ENVIRONMENT || "",
};
/**
 * New Logger Instance
 */
if (secrets_util_1.ENVIRONMENT !== "production") {
    logger.debug("Logging initialized at debug level");
    logger.add(new winston_1.default.transports.Console({
        format: winston_1.default.format.simple()
    }));
}
exports.default = logger;
//# sourceMappingURL=logger.util.js.map