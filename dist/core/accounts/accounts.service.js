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
const oracle_service_1 = require("../../databases/oracle.service");
const hash_generator_util_1 = require("../../util/hash.generator.util");
const oracledb_1 = __importDefault(require("oracledb"));
class AccountsService {
    /**
     * Summary: Create account
     * @description Create account
     * @Method POST
     * @function createAccountsSrv
     * @param {any} _query, _params or _body
     * @memberof accounts
     */
    createAccountsSrv(_headers, _params, _body) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                /**
                 * Summary: Create a new account
                 * @description Create a new account in the cluster
                 */
                const _accountInformation = {
                    user_id: hash_generator_util_1.hashGenerator.getUniqueHash(),
                    group_id: hash_generator_util_1.hashGenerator.getUniqueHash(),
                    firstname: _body.firstname,
                    lastname: _body.lastname,
                };
                const queryBuilder = `
        INSERT INTO accounts (user_id, group_id, firstname, ... lastname ) VALUES (${_accountInformation.user_id}, ${_accountInformation.group_id}, ${_accountInformation.firstname}, ... ${_accountInformation.lastname} );
      `;
                const options = {
                    autoCommit: true,
                    bindDefs: [
                        { type: oracledb_1.default.STRING },
                        { type: oracledb_1.default.STRING },
                        { type: oracledb_1.default.STRING, maxSize: 20 },
                        { type: oracledb_1.default.STRING, maxSize: 20 }
                    ]
                };
                try {
                    const _createResult = yield oracle_service_1.oracleDBService.executeInsertQuery(queryBuilder, options);
                    /** Resolve the promise */
                    resolve({
                        statusCode: 200,
                        data: _createResult
                    });
                }
                catch (_err) {
                    /** Reject the promise */
                    reject({
                        statusCode: 503,
                        message: _err,
                    });
                }
            }));
        });
    }
    /**
     * Summary: Get all accounts
     * @description Get all accounts
     * @Method GET
     * @function getAllAccountsSrv
     * @param {any} _query, _params or _body optionals
     * @memberof accounts
     */
    getAllAccountsSrv(_headers, _query) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                const queryBuilder = `
        SELECT accounts_id, department_id, department_name
        FROM accounts
      `;
                try {
                    const _createResult = yield oracle_service_1.oracleDBService.executeSelectQuery(queryBuilder);
                    /** Resolve the promise */
                    resolve({
                        statusCode: 200,
                        data: _createResult
                    });
                }
                catch (_err) {
                    /** Reject the promise */
                    reject({
                        statusCode: 503,
                        message: _err,
                    });
                }
            }));
        });
    }
    /**
     * Summary: Returns account information by Id
     * @description Returns account information associated with the ID requested
     * @Method GET
     * @function getAccountByIdSrv
     * @param {any} _query, _params or _body
     * @memberof accounts
     */
    getAccountByIdSrvc(_headers, _params) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                const queryBuilder = `
        SELECT accounts_id, department_id, department_name
        FROM accounts
        WHERE manager_id = ${_params.manager_id}
      `;
                try {
                    const _createResult = yield oracle_service_1.oracleDBService.executeSelectQuery(queryBuilder);
                    /** Resolve the promise */
                    resolve({
                        statusCode: 200,
                        data: _createResult
                    });
                }
                catch (_err) {
                    /** Reject the promise */
                    reject({
                        statusCode: 503,
                        message: _err,
                    });
                }
            }));
        });
    }
    /**
     * Summary: Update Account
     * @description Update account
     * @Method POST
     * @function updateAccountByIdSrv
     * @param {any} _query, _params or _body
     * @memberof accounts
     */
    updateAccountByIdSrv(_headers, _params, _body) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                /**
                 * Summary: Update Account
                 * @description Update account
                 */
                const _accountInformation = {
                    firstname: _body.firstname,
                    lastname: _body.lastname,
                };
                const queryBuilder = `
        UPDATE accounts SET firstname = ${_accountInformation.firstname}, lastname =${_accountInformation.lastname}
        WHERE user_id = ${_accountInformation.user_id} AND group_id = ${_accountInformation.group_id};
      `;
                try {
                    const _createResult = yield oracle_service_1.oracleDBService.executeUpdateQuery(queryBuilder);
                    /** Resolve the promise */
                    resolve({
                        statusCode: 200,
                        data: _createResult
                    });
                }
                catch (_err) {
                    /** Reject the promise */
                    reject({
                        statusCode: 503,
                        message: _err,
                    });
                }
            }));
        });
    }
    /**
     * Summary: Create account
     * @description Create account
     * @Method POST
     * @function deleteAccountByIdSrv
     * @param {any} _query, _params or _body
     * @memberof accounts
     */
    deleteAccountByIdSrv(_headers, _params, _body) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                /**
                 * Summary: Update Account
                 * @description Update account
                 */
                const _accountInformation = {
                    firstname: _body.firstname,
                    lastname: _body.lastname,
                };
                const queryBuilder = `
        DELETE FROM accounts
        WHERE user_id = ${_accountInformation.user_id} AND group_id = ${_accountInformation.group_id};
      `;
                try {
                    const _createResult = yield oracle_service_1.oracleDBService.executeUpdateQuery(queryBuilder);
                    /** Resolve the promise */
                    resolve({
                        statusCode: 200,
                        data: _createResult
                    });
                }
                catch (_err) {
                    /** Reject the promise */
                    reject({
                        statusCode: 503,
                        message: _err,
                    });
                }
            }));
        });
    }
    /**
     * Summary: Returns account information by criteria
     * @description Returns account information associated with the criteria requested
     * @Method GET
     * @function searchAccountByCriteriaSrvc
     * @param {any} _query, _params or _body
     * @memberof accounts
     */
    searchAccountByCriteriaSrvc(_headers, _params, _query) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                const queryBuilder = `
        SELECT accounts_id, manager_id, department_id
        FROM accounts
        WHERE accounts_id = ${_query.criteria} OR manager_id = ${_query.criteria} OR department_id = ${_query.criteria}
      `;
                try {
                    const _createResult = yield oracle_service_1.oracleDBService.executeSelectQuery(queryBuilder);
                    /** Resolve the promise */
                    resolve({
                        statusCode: 200,
                        data: _createResult
                    });
                }
                catch (_err) {
                    /** Reject the promise */
                    reject({
                        statusCode: 503,
                        message: _err,
                    });
                }
            }));
        });
    }
}
exports.AccountsService = AccountsService;
//# sourceMappingURL=accounts.service.js.map