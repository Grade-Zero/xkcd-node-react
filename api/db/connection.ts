import { config } from '../config';

import * as mysql from 'mysql'

export type OptionalConnection = mysql.PoolConnection | null
let pool  = mysql.createPool({
  connectionLimit : 100,
  database        : config.database.database,
  host            : config.database.host,
  password        : config.database.password,
  port            : config.database.port,
  user            : config.database.user
});

// Pass the queryHandler a function that returns a promise and has the client as the first parameter
export async function queryHandler (existingConnection: OptionalConnection, queryFunction: Function): Promise<any> {
  // If we already have a db connection we don't need to create a new one (so that it uses the transaction)
  if (existingConnection) {
    return queryFunction(existingConnection)
  }
  const connection = await (new Promise((res, rej) => {
    pool.getConnection(function(err: any, con) {
      return err ? rej(err) : res(con)
    })
  })) as mysql.PoolConnection

  try {
    let result = await new Promise((res, rej) => {
      connection.beginTransaction(async function(err) {
        if (err) {
          return rej(err)
        }
        const queryResult = await queryFunction(connection).catch(rej)
        connection.commit((commitError) => {
          if (commitError) {
            rej(commitError)
          }
          return res(queryResult)
        })
      })
    })
    connection.release()
    return result
  } catch (e) {
    await connection.rollback(function (rollbackErr) {
      if (rollbackErr) {
        console.error('!!!!!!!!!!!FAILED ROLLBACK!!!!!!!!!!')
        console.error(rollbackErr)
      }
    });
    connection.release()
    throw e
  }
}

interface QueryObj {
  sql: string,
  values?: any[]
}
export async function query<T>(client: mysql.PoolConnection, queryObj: QueryObj, insertData?: any): Promise<T> {
  return new Promise((res, rej) => {
    function handleResponseCb(error: mysql.MysqlError, results: T, fields: mysql.FieldInfo[]) {
        if (error) { return rej(error) }
        return res(results)
    }
    return insertData ?
      client.query(queryObj.sql, insertData, handleResponseCb) :
      client.query(queryObj, handleResponseCb)
  }) as Promise<T>
}

export function extractSingle<T>(rows: T[]): T | null {
  return rows.length > 0 ? rows[0] : null
}
