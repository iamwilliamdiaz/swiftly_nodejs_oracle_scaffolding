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
const secrets_util_1 = require("../../../util/secrets.util");
const index_1 = __importDefault(require("../../../index"));
const supertest_1 = __importDefault(require("supertest"));
const chai_1 = require("chai");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
let server;
const account = {
    user_id: 0
};
const payload = {
    id: "00000000000000000000",
    name: new Date()
};
const token = jsonwebtoken_1.default.sign(payload, secrets_util_1.ENABLE_TOKENIZATION_SECRET, { expiresIn: 36000 });
/**
 * Summary:
 * @description
 * @method beforeAll
 * @returns index.ts
 *
 * @beta
 */
beforeAll((done) => __awaiter(void 0, void 0, void 0, function* () {
    process.env.TEST = "true";
    try {
        /**
         * Summary: Instantiate express app server
         * @description
         * @beta
         */
        server = index_1.default.setup();
        /**
         * Summary: post request to create a new account
         * @description
         * @beta
         */
        const response = yield supertest_1.default(server).post("/accounts")
            .send({ firstname: "Joe", lastname: "Doe" })
            .set({ "x-session-token": token, "Accept": "application/json" })
            .expect("Content-Type", /json/)
            .expect(200);
        chai_1.assert.isNotEmpty(response.body.result);
        chai_1.assert.isArray(response.body.result);
        account.user_id = (response && response.body && response.body.result && response.body.result[0].user_id) ? response.body.result[0].user_id : 0;
        console.log(account.user_id);
        done();
    }
    catch (_err) {
        console.log(_err);
        done();
    }
}));
/**
 * Summary:
 * @description
 * @method getAcpGroupsById
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<Object>}
 *
 * @beta
 */
describe("Get Accounts Details - 200 Integration", () => {
    it("should return 200", (done) => __awaiter(void 0, void 0, void 0, function* () {
        yield supertest_1.default(server).get(`/accounts/${account.user_id}`)
            .set({ "x-session-token": token, "Accept": "application/json" })
            .expect("Content-Type", /json/)
            .expect(200)
            .then(response => {
            chai_1.assert.isNotEmpty(response.body.result);
            chai_1.assert.isArray(response.body.result);
            chai_1.assert.strictEqual(response.body.result[0].user_id, account.user_id);
            done();
        });
    }));
});
/**
 * Summary:
 * @description
 * @method getAcpGroupsById
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<Object>}
 *
 * @beta
 */
describe("Get Accounts Details with invalid token - 403 Integration", () => {
    it("should return 403", (done) => __awaiter(void 0, void 0, void 0, function* () {
        yield supertest_1.default(server).get(`/accounts/${account.user_id}`)
            .set({ "x-session-token": "0000000000000", "Accept": "application/json" })
            .expect("Content-Type", /json/)
            .expect(401)
            .then(response => {
            chai_1.assert.isNotEmpty(response.body.result);
            chai_1.assert.isObject(response.body.result);
            done();
        });
    }));
});
afterAll((done) => {
    if (server) {
        index_1.default.kill();
    }
    done();
});
//# sourceMappingURL=accounts.integration.test.specs.js.map