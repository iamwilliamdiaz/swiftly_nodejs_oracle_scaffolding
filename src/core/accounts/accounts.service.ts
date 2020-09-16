import { IAccountsFunctions, IAccountsModel } from "./accounts.interface";
import { oracleDBService } from "../../databases/oracle.service";
import { hashGenerator } from "../../util/hash.generator.util";

import oracledb from "oracledb";

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

      const queryBuilder = `
        INSERT INTO accounts (user_id, group_id, firstname, ... lastname ) VALUES (${_accountInformation.user_id}, ${_accountInformation.group_id}, ${_accountInformation.firstname}, ... ${_accountInformation.lastname} );
      `;

      const options = {
        autoCommit: true,
        bindDefs: [
          { type: oracledb.STRING },
          { type: oracledb.STRING },
          { type: oracledb.STRING, maxSize: 20 },
          { type: oracledb.STRING, maxSize: 20 }
        ]
      };

      try {
        const _createResult: any = await oracleDBService.executeInsertQuery(queryBuilder, options);
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
  public async getAllAccountsSrv(_headers?: any, _query?: any) {

    return new Promise(async (resolve, reject) => {

      const queryBuilder = `
        SELECT accounts_id, department_id, department_name
        FROM accounts
      `;

      try {
        const _createResult: any = await oracleDBService.executeSelectQuery(queryBuilder);
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
  public async getAccountByIdSrvc(_headers: any, _params: any) {

    return new Promise(async (resolve, reject) => {

      const queryBuilder = `
        SELECT accounts_id, department_id, department_name
        FROM accounts
        WHERE manager_id = ${_params.manager_id}
      `;

      try {
        const _createResult: any = await oracleDBService.executeSelectQuery(queryBuilder);
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
  public async updateAccountByIdSrv(_headers: any, _params: any, _body: IAccountsModel) {

    return new Promise(async (resolve, reject) => {

      /**
       * Summary: Update Account
       * @description Update account
       */

      const _accountInformation: IAccountsModel = {
        firstname: _body.firstname,
        lastname: _body.lastname,
      };

      const queryBuilder = `
        UPDATE accounts SET firstname = ${_accountInformation.firstname}, lastname =${_accountInformation.lastname}
        WHERE user_id = ${_accountInformation.user_id} AND group_id = ${_accountInformation.group_id};
      `;

      try {
        const _createResult: any = await oracleDBService.executeUpdateQuery(queryBuilder);
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
  public async deleteAccountByIdSrv(_headers: any, _params: any, _body: IAccountsModel) {

    return new Promise(async (resolve, reject) => {

      /**
       * Summary: Update Account
       * @description Update account
       */

      const _accountInformation: IAccountsModel = {
        firstname: _body.firstname,
        lastname: _body.lastname,
      };

      const queryBuilder = `
        DELETE FROM accounts
        WHERE user_id = ${_accountInformation.user_id} AND group_id = ${_accountInformation.group_id};
      `;

      try {
        const _createResult: any = await oracleDBService.executeUpdateQuery(queryBuilder);
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

      const queryBuilder = `
        SELECT accounts_id, manager_id, department_id
        FROM accounts
        WHERE accounts_id = ${_query.criteria} OR manager_id = ${_query.criteria} OR department_id = ${_query.criteria}
      `;

      try {
        const _createResult: any = await oracleDBService.executeSelectQuery(queryBuilder);
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

    });

  }

}





