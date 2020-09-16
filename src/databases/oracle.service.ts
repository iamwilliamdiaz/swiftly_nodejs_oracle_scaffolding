import { oracleDBConnector } from "./oracle.connector";
import logger from "../util/logger.util";
import oracledb from "oracledb";
export namespace oracleDBService {
  /**
   *
   * @function executeSelectQuery
   * @export
   * @param {object} _query
   * @param {number} _binds
   * @param {Object} _options
   * @returns
   */
  export async function executeSelectQuery(_query: any, _binds?: Array<[0]>, _options?: Object) {
    return new Promise(async (resolve, reject) => {
      let oracleConnection;
      try {

        // Get a connection from the default pool
        oracleConnection = await oracleDBConnector.getPoolConnection();
        const options = _options || { outFormat: oracledb.OUT_FORMAT_OBJECT };
        const _result = await oracleConnection.execute(_query, _binds, options);
        return resolve(_result);

      } catch (_err) {
        reject(_err);
      } finally {
        if (oracleConnection) {
          try {
            // Put the connection back in the pool
            await oracleConnection.close();
          } catch (_err) {
            logger.error(_err);
            return new Error(_err);
          }
        }
      }
    });
  }
  /**
   *
   * @function executeInsertQuery
   * @export
   * @param {object} _query
   * @param {number} _binds
   * @param {Object} _options
   * @returns
   */
  export async function executeInsertQuery(_body: any, _options?: Object) {
    return new Promise(async (resolve, reject) => {
      let oracleConnection;
      try {

        // Get a connection from the default pool
        oracleConnection = await oracleDBConnector.getPoolConnection();
        const _result = await oracleConnection.execute(_body, _options);
        return resolve(_result);

      } catch (_err) {
        reject(_err);
      } finally {
        if (oracleConnection) {
          try {
            // Put the connection back in the pool
            await oracleConnection.close();
          } catch (_err) {
            logger.error(_err);
            return new Error(_err);
          }
        }
      }
    });
  }
  /**
   *
   * @function executeInsertQuery
   * @export
   * @param {object} _query
   * @returns
   */
  export async function executeUpdateQuery(_query: any) {
    return new Promise(async (resolve, reject) => {
      let oracleConnection;
      try {

        // Get a connection from the default pool
        oracleConnection = await oracleDBConnector.getPoolConnection();
        const _result = await oracleConnection.execute(_query);
        return resolve(_result);

      } catch (_err) {
        reject(_err);
      } finally {
        if (oracleConnection) {
          try {
            // Put the connection back in the pool
            await oracleConnection.close();
          } catch (_err) {
            logger.error(_err);
            return new Error(_err);
          }
        }
      }
    });
  }
  /**
   *
   * @function executeDeleteQuery
   * @export
   * @param {object} _query
   * @returns
   */
  export async function executeDeleteQuery(_query: any) {
    return new Promise(async (resolve, reject) => {
      let oracleConnection;
      try {

        // Get a connection from the default pool
        oracleConnection = await oracleDBConnector.getPoolConnection();
        const _result = await oracleConnection.execute(_query);
        return resolve(_result);

      } catch (_err) {
        reject(_err);
      } finally {
        if (oracleConnection) {
          try {
            // Put the connection back in the pool
            await oracleConnection.close();
          } catch (_err) {
            logger.error(_err);
            return new Error(_err);
          }
        }
      }
    });
  }
}
