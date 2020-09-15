import { MONGO_USERNAME, MONGO_PASSWORD, MONGO_URI } from "../util/secrets.util";
import { MongoClient } from "mongodb";
import logger from "../util/logger.util";

const uri = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_URI}`;
let dbinstance: any;

export namespace mongoDBConnector {
  /**
   *
   * @function getPoolConnection
   * @export
   * @returns dbinstance
   */
  export async function getPoolConnection() {
    if (!dbinstance) {
      dbinstance = await setConnection();
      return dbinstance;
    }
    return dbinstance;
  }
  async function setConnection() {
    try {
      return await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
        .then((dbo: any) => {
          return dbo;
        })
        .catch((err: any) => {
          return err;
        });
    } catch (_error) {
      logger.error(_error);
      return new Error(_error);
    }
  }
}
