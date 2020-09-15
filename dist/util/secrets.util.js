"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const fs_1 = __importDefault(require("fs"));
if (fs_1.default.existsSync(".env")) {
    dotenv_1.default.config({ "path": ".env" });
}
else {
    dotenv_1.default.config({ "path": ".env.dev" });
}
/* eslint no-process-env: "error"*/
exports.API_NAME = process.env.API_NAME;
// if (!API_NAME) {
//   throw new Error("Problems to read the API_NAME in the .env file");
// }
exports.API_PORT = process.env.API_PORT;
// if (!API_PORT) {
//   throw new Error("Problems to read the API_PORT in the .env file");
// }
exports.ENVIRONMENT = process.env.NODE_ENV;
exports.SESSION_SECRET = process.env.SESSION_SECRET;
// if (!SESSION_SECRET) {
//   throw new Error("Problems to read the SESSION_SECRET in the .env file");
// }
exports.MONGO_URI = process.env.MONGO_URI;
// if (!MONGO_URI) {
//   throw new Error("Problems to read the MONGO_URI in the .env file");
// }
exports.MONGO_USERNAME = process.env.MONGO_USERNAME;
// if (!MONGO_USERNAME) {
//   throw new Error("Problems to read the MONGO_USERNAME in the .env file");
// }
exports.MONGO_PASSWORD = process.env.MONGO_PASSWORD;
// if (!MONGO_PASSWORD) {
//   throw new Error("Problems to read the MONGO_PASSWORD in the .env file");
// }
exports.ENABLE_TOKENIZATION = process.env.ENABLE_TOKENIZATION;
// if (!ENABLE_TOKENIZATION) {
//   throw new Error("Problems to read the ENABLE_TOKENIZATION in the .env file");
// }
exports.ENABLE_TOKENIZATION_SECRET = process.env.ENABLE_TOKENIZATION_SECRET;
// if (!ENABLE_TOKENIZATION_SECRET) {
//   throw new Error("Problems to read the ENABLE_TOKENIZATION_SECRET in the .env file");
// }
exports.ENABLE_TOKENIZATION_LOCAL_SECRET = process.env.ENABLE_TOKENIZATION_LOCAL_SECRET;
// if (!ENABLE_TOKENIZATION_LOCAL_SECRET) {
//   throw new Error("Problems to read the ENABLE_TOKENIZATION_LOCAL_SECRET in the .env file");
// }
exports.LOGLEVEL = process.env.LOGLEVEL;
// if (!LOGLEVEL) {
//   throw new Error("Problems to read the LOGLEVEL in the .env file");
// }
//# sourceMappingURL=secrets.util.js.map