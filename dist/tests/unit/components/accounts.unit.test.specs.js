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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Accounts = __importStar(require("../../../core/accounts/accounts.controllers"));
const node_mocks_http_1 = __importDefault(require("node-mocks-http"));
let mockAccountsReq;
const validRequest = {
    // Default validations used
    assert: function () { return this; },
    checkHeaders: function () { return this; },
    checkBody: function () { return this; },
    checkQuery: function () { return this; },
    notEmpty: function () { return this; },
    // Custom validations used
    isHash: function () { return this; },
    isArray: function () { return this; },
    gte: function () { return this; },
    // Validation errors
    validationErrors: function () { return false; }
};
function getValidInputRequest(request) {
    Object.assign(request, validRequest);
    return request;
}
function getInvalidInputRequest(request, errorParams) {
    // Get de default valid request
    Object.assign(request, validRequest);
    // Override the validationErrors function with desired errors
    request.validationErrors = function () {
        const errors = [];
        errorParams.forEach(function (error) {
            errors.push({ msg: 'the parameter "' + error + '" is mandatory' });
        });
        return errors;
    };
    return request;
}
/**
 * Summary: Get Accounts Details
 * @description Called by applications requiring account detail for a Accounts, possibly not oneself.
 * @method Accounts
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<Object>}
 *
 * @beta
 */
describe("Get Accounts Details - Success", () => {
    it("should return 200 OK", (done) => __awaiter(void 0, void 0, void 0, function* () {
        mockAccountsReq = node_mocks_http_1.default.createRequest({
            method: "GET",
            url: "/account/12345",
            params: {
                user_id: 12345
            }
        });
        mockAccountsReq.headers["x-session-token"] = "111111111111111";
        mockAccountsReq = getValidInputRequest(mockAccountsReq);
        try {
            const _result = yield Accounts.getAccountById(mockAccountsReq);
            // console.log(_result);
        }
        catch (_err) {
            console.log(_err);
        }
        done();
    }));
});
/**
 * Summary: Get Accounts Details
 * @description Called by applications requiring account detail for a Accounts, possibly not oneself.
 * @method Accounts
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<Object>}
 *
 * @beta
 */
describe("Get Accounts Details - Fail", () => {
    it("should return 422 code", (done) => __awaiter(void 0, void 0, void 0, function* () {
        mockAccountsReq = node_mocks_http_1.default.createRequest({
            method: "GET",
            url: "/account/"
        });
        mockAccountsReq.headers["x-session-token"] = "111111111111111";
        mockAccountsReq = getInvalidInputRequest(mockAccountsReq, ["user_id"]);
        try {
            const _result = yield Accounts.getAccountById(mockAccountsReq);
            // console.log(_result);
        }
        catch (_err) {
            console.log(_err);
        }
        done();
    }));
});
/**
 * Summary: Create Account
 * @description Called by applications requiring account detail for a Accounts, possibly not oneself.
 * @method Accounts
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<Object>}
 *
 * @beta
 */
describe("Create Accounts Details", function () {
    it("should return 200 OK", (done) => __awaiter(this, void 0, void 0, function* () {
        mockAccountsReq = node_mocks_http_1.default.createRequest();
        mockAccountsReq.body = {
            firstname: "John",
            lastanem: "Doe"
        };
        mockAccountsReq.headers["x-session-token"] = "111111111111111";
        mockAccountsReq = getValidInputRequest(mockAccountsReq);
        try {
            const _result = yield Accounts.createAccounts(mockAccountsReq);
            // console.log(_result);
        }
        catch (_err) {
            console.log(_err);
        }
        done();
    }));
});
/**
 * Summary: Create Account
 * @description Called by applications requiring account detail for a Accounts, possibly not oneself.
 * @method Accounts
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<Object>}
 *
 * @beta
 */
describe("Create Accounts Details - Fail", () => {
    it("Should return 422 code", (done) => __awaiter(void 0, void 0, void 0, function* () {
        mockAccountsReq = node_mocks_http_1.default.createRequest();
        mockAccountsReq.headers["x-session-token"] = "111111111111111";
        mockAccountsReq = getInvalidInputRequest(mockAccountsReq, ["firstname", "lastname"]);
        try {
            const _result = yield Accounts.createAccounts(mockAccountsReq);
            // console.log(_result);
        }
        catch (_err) {
            console.log(_err);
        }
        done();
    }));
});
//# sourceMappingURL=accounts.unit.test.specs.js.map