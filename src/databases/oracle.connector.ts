import { ORACLE_USERNAME, ORACLE_PASSWORD, ORACLE_CONNECTION_STRING } from "../util/secrets.util";
import oracledb from "oracledb";
import logger from "../util/logger.util";

let connectionPool: any;

export namespace oracleDBConnector {
  /**
   *
   * @function getPoolConnection
   * @export
   * @returns connectionPool
   */
  export async function getPoolConnection() {

    if (!connectionPool) {
      connectionPool = await setConnection();
      return connectionPool;
    }
    return connectionPool;
  }

  async function setConnection() {
    try {
      return await oracledb.createPool({
        user: ORACLE_USERNAME,
        password: ORACLE_PASSWORD,
        connectString: ORACLE_CONNECTION_STRING,
        edition: "ORA$BASE", // used for Edition Based Redefintion
        events: false, // whether to handle Oracle Database FAN and RLB events or support CQN
        externalAuth: false, // whether connections should be established using External Authentication
        homogeneous: true, // all connections in the pool have the same credentials
        poolAlias: "default", // set an alias to allow access to the pool via a name.
        poolIncrement: 1, // only grow the pool by one connection at a time
        poolMax: 4, // maximum size of the pool. Increase UV_THREADPOOL_SIZE if you increase poolMax
        poolMin: 0, // start with no connections; let the pool shrink completely
        poolPingInterval: 60, // check aliveness of connection if idle in the pool for 60 seconds
        poolTimeout: 60, // terminate connections that are idle in the pool for 60 seconds
        queueMax: 500, // don't allow more than 500 unsatisfied getConnection() calls in the pool queue
        queueTimeout: 60000, // terminate getConnection() calls queued for longer than 60000 milliseconds
        stmtCacheSize: 30, // number of statements that are cached in the statement cache of each connection
        _enableStats: false // record pool usage statistics that can be output with pool._logStats()
    //  sessionCallback: myFunction, // function invoked for brand new connections or by a connection tag mismatch
      });
    } catch (_err) {
      logger.error(_err);
      return new Error(_err);
    } finally {
      await closePoolAndExit();
    }
  }

  async function closePoolAndExit() {
    console.log("\nTerminating Oracle Connection Pool");
    try {
      // Get the pool from the pool cache and close it when no
      // connections are in use, or force it closed after 10 seconds.
      // If this hangs, you may need DISABLE_OOB=ON in a sqlnet.ora file.
      // This setting should not be needed if both Oracle Client and Oracle
      // Database are 19c (or later).
      await oracledb.getPool().close(10);
      console.log("Pool closed");
    } catch (_err) {
      logger.error(_err);
    }
  }
}
