import { OptionalConnection, queryHandler, query } from './connection'
import { PoolConnection } from 'mysql';
import { InsertId } from '../models/standard';
import { AuditNoIdDb, AuditDb } from '../models/audit';

export function insertAuditDb (optionalConnection: OptionalConnection, data: AuditNoIdDb): Promise<string> {
    return queryHandler(optionalConnection, async function (client: PoolConnection) {
      await query<any[]>(client, {
          sql: `INSERT INTO audit SET ?;`,
      }, data)
      const newBottleEntry = await query<InsertId[]>(client, {
        sql: `SELECT LAST_INSERT_ID();`
      })
      return newBottleEntry[0]['LAST_INSERT_ID()']
    })
  }

export function insertAuditBatchDb (optionalConnection: OptionalConnection, data: (AuditNoIdDb)[]): Promise<number> {
    return queryHandler(optionalConnection, async function (client: PoolConnection) {
      await query<AuditDb[]>(client, {
          sql: `INSERT INTO audit (company_id, action, payload) VALUES ?`,
      }, [data])
    })
  }
