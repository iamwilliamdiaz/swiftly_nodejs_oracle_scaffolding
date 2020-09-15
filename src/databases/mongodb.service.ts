import { mongoDBConnector } from "./mongodb.connector";
import logger from "../util/logger.util";

export namespace mongoDBService {
  /**
   *
   * @function setConnection
   * @param {string} _databaseName
   * @returns
   */
  async function getMongoDBInstance() {
    try {
      return await mongoDBConnector.getPoolConnection();
    } catch (_error) {
      logger.error(_error);
      return new Error(_error);
    }
  }
  /**
   *
   * @function findById
   * @export
   * @param {string} _db
   * @param {string} _model
   * @param {object} _query
   * @returns
   */
  export async function findDoc(_db: string, _model: string, _query: any) {
    return new Promise(async (resolve, reject) => {
      const dbInstance = await getMongoDBInstance();
      const collection = await dbInstance.db(_db).collection(_model);
      await collection.find(_query).toArray(async (_err: any, _result: any) => {
        if (_err) {
          reject(_err);
        }
        return resolve(_result);
      });
    });
  }
  /**
   *
   * @function findById
   * @export
   * @param {string} _db
   * @param {string} _model
   * @param {object} _query
   * @returns
   */
  // export async function findDocByAggr(_db: string, _model: string, _query: any) {
  //   return new Promise(async (resolve, reject) => {
  //     const dbInstance = await getMongoDBInstance();
  //     const collection = await dbInstance.db(_db).collection(_model);
  //     await collection.aggregate(_query).toArray(async (_err: any, _result: any) => {
  //       if (_err) {
  //         reject(_err);
  //       }
  //       return resolve(_result);
  //     });
  //   });
  // }
  /**
   *
   * @function createDoc
   * @export
   * @param {string} _db
   * @param {string} _model
   * @param {object} _body
   * @returns
   */
  export async function createDoc(_db: string, _model: string, _body: any) {
    return new Promise(async (resolve, reject) => {
      const dbInstance = await getMongoDBInstance();
      const collection = await dbInstance.db(_db).collection(_model);
      await collection.insertOne(_body, (_err: any, _result: any) => {
        if (_err) {
          reject(_err);
        }
        return resolve(_result);
      });
    });
  }
  /**
   *
   * @function updateDoc
   * @export
   * @param {string} _db
   * @param {string} _model
   * @param {object} _body
   * @returns
   */
  export async function updateDoc(_db: string, _model: string, _query: Object, _body: any) {
    return new Promise(async (resolve, reject) => {
      const dbInstance = await getMongoDBInstance();
      const collection = await dbInstance.db(_db).collection(_model);
      await collection.update(_query, _body, {
        upsert: true
      }, function (_err: any, _result: any) {
        if (_err) {
          reject(_err);
        }
        return resolve(_result);
      });
    });
  }
  /**
   *
   * @function deleteDoc
   * @export
   * @param {string} _db
   * @param {string} _model
   * @param {object} _body
   * @returns
   */
  export async function deleteDoc(_db: string, _model: string, _params: any) {
    return new Promise(async (resolve, reject) => {
      const dbInstance = await getMongoDBInstance();
      const collection = await dbInstance.db(_db).collection(_model);
      await collection.deleteOne(_params, (_err: any, _result: any) => {
        if (_err) {
          reject(_err);
        }
        return resolve(_result);
      });
    });
  }
  /**
   *
   * @function searchDoc
   * @export
   * @param {string} _db
   * @param {string} _model
   * @param {object} _body
   * @returns
   */
  export async function searchDoc(_db: string, _model: string, _query: any) {
    return new Promise(async (resolve, reject) => {
      const dbInstance = await getMongoDBInstance();
      const collection = await dbInstance.db(_db).collection(_model);
      const searchSkip = (parseInt(_query.skip)) || 0;
      const searchlimit = (parseInt(_query.limit)) || 1;
      const searchSort = _query.sort || { _id: -1 };
      await collection.aggregate(_query.criteria).skip(searchSkip).limit(searchlimit).sort(searchSort).toArray((_err: any, _result: any) => {
        if (_err) {
          reject(_err);
        }
        return resolve(_result);
      });
    });
  }
}
