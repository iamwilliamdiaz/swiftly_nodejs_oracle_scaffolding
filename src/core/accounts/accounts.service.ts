import { IAccountsFunctions, IAccountsModel } from "./accounts.interface";
import { mongoDBService } from "../../databases/mongodb.service";
import { hashGenerator } from "../../util/hash.generator.util";

/**
 * Database and model names
 */
const exampleDb = "example-db";
const AccountsModel = "Accounts";

export class AccountsService implements IAccountsFunctions {
  /**
   * Summary: Create account
   * @description Create account
   * @Method POST
   * @function createAccountsSrv
   * @param {any} _query, _params or _body
   * @memberof accounts
   */
  public async createAccountsSrv(_headers: any, _params: any, _body: IAccountsModel) {

    return new Promise(async (resolve, reject) => {

      /**
       * Summary: Create a new account
       * @description Create a new account in the cluster
       */

      const _accountInformation: IAccountsModel = {
        user_id: hashGenerator.getUniqueHash(),
        group_id: hashGenerator.getUniqueHash(),
        firstname: _body.firstname,
        lastname: _body.lastname,
      };

      try {
        const _createResult: any = await mongoDBService.createDoc(exampleDb, AccountsModel, hashGenerator.injectHash(_accountInformation));
        /** Resolve the promise */
        resolve({
          statusCode: 200,
          data: _createResult.ops
        });
      }
      catch (_err) {
        /** Reject the promise */
        reject({
          statusCode: 503,
          message: _err,
        });
      }

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
  public async getAccountByIdSrvc(_headers: any, _params: any, _query: any) {

    return new Promise(async (resolve, reject) => {

      const _dbQuery = {
        user_id: _params.user_id
      };

      try {
        const _findResult = await mongoDBService.findDoc(exampleDb, AccountsModel, _dbQuery);
        /** Resolve the promise */
        resolve({
          statusCode: (_findResult) ? 200 : 404,
          data: _findResult
        });
      }
      catch (_err) {
        /** Reject the promise */
        reject({
          statusCode: 503,
          message: _err,
        });
      }

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
  public async searchAccountByCriteriaSrvc(_headers: any, _params: any, _query: any) {

    return new Promise(async (resolve, reject) => {

      const _dbQuery = {
        criteria: {
          $or: [
            { "firstname": { "$regex": `^.*${_query.criteria}`, "$options": "si" } },
            { "lastname": { "$regex": `^.*${_query.criteria}`, "$options": "si" } }
          ]
        },
        skip: _query.skip,
        limit: _query.limit,
        sort:  _query.sort
      };

      try {
        const _searchResult = await mongoDBService.searchDoc(exampleDb, AccountsModel, _dbQuery);
        /** Resolve the promise */
        resolve({
          statusCode: (_searchResult) ? 200 : 404,
          data: _searchResult
        });
      }
      catch (_err) {
        /** Reject the promise */
        reject({
          statusCode: 503,
          message: _err,
        });
      }

    });

  }

  /**
   * Summary: Update the existing account
   * @description Update the existing account
   * @Method POST
   * @function createAccountsSrv
   * @param {any} _query, _params or _body
   * @memberof accounts
   */
  public async deleteAccountByIdSrv(_headers: any, _params: any, _body: IAccountsModel) {

    return new Promise(async (resolve, reject) => {

      /**
       * Summary: Query the existing account
       */
      const _dbQuery = {
        user_id: _params.user_id
      };

      try {
        const _deleteResult: any = await mongoDBService.deleteDoc(exampleDb, AccountsModel, _dbQuery);
        /** Resolve the promise */
        resolve({
          statusCode: 204,
          data: _deleteResult
        });
      }
      catch (_err) {
        /** Reject the promise */
        reject({
          statusCode: 503,
          message: _err,
        });
      }

    });

  }


  /**
   * Summary: Update the existing account
   * @description Update the existing account
   * @Method POST
   * @function createAccountsSrv
   * @param {any} _query, _params or _body
   * @memberof accounts
   */
  public async updateAccountByIdSrv(_headers: any, _params: any, _body: IAccountsModel) {

    return new Promise(async (resolve, reject) => {

      /**
       * Summary: Query the existing account
       */
      const _dbQuery = {
        user_id: _params.user_id
      };

      /**
       * Summary: Create a new account
       */
      const _accountInformation = {
        $set: {
          firstname: _body.firstname,
          lastname: _body.lastname,
        }
      };

      try {
        const _updateResult: any = await mongoDBService.updateDoc(exampleDb, AccountsModel, _dbQuery, _accountInformation);
        /** Resolve the promise */
        resolve({
          statusCode: 204,
          data: _updateResult.result
        });
      }
      catch (_err) {
        /** Reject the promise */
        reject({
          statusCode: 503,
          message: _err,
        });
      }

    });

  }

}






