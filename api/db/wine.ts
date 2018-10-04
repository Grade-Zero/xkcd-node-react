import { queryHandler, query, OptionalConnection, extractSingle } from './connection'
import { PoolConnection } from 'mysql'
import { WineDb, WineNoIdDb } from '../models/wine';
import { InsertId } from '../models/standard';
import { escapeJsonParam } from '../utils/db_helpers';

export function fetchAllWine (optionalConnection: OptionalConnection): Promise<WineDb[]> {
    return queryHandler(optionalConnection, async function (connection: PoolConnection) {
      const dataQuery = await query<WineDb[]>(connection, {
          sql: `SELECT * FROM cellar_bottles ORDER BY id`
      })
      return dataQuery
    })
}

export function fetchWineByCompanyId (optionalConnection: OptionalConnection, companyId: number): Promise<WineDb[]> {
    return queryHandler(optionalConnection, async function (connection: PoolConnection) {
      const dataQuery = await query<WineDb[]>(connection, {
          sql: `SELECT * FROM cellar_bottles WHERE company_id = ? AND archived = 0 ORDER BY id`,
          values: [String(companyId)]
      })
      return dataQuery
    })
}

export function fetchWineByBin (optionalConnection: OptionalConnection, binId: number): Promise<WineDb[]> {
    return queryHandler(optionalConnection, async function (connection: PoolConnection) {
      const dataQuery = await query<WineDb[]>(connection, {
          sql: `SELECT * FROM cellar_bottles WHERE bin_id = ? ORDER BY coordinate`,
          values: [String(binId)]
      })
      return dataQuery
    })
}

export function insertSingleBottle(optionalConnection: OptionalConnection, data: WineNoIdDb): Promise<string> {
    return queryHandler(optionalConnection, async function (client: PoolConnection) {
        await query<any[]>(client, {
            sql: `INSERT INTO cellar_bottles SET ?;`,
        }, data)
        const newBottleEntry = await query<InsertId[]>(client, {
            sql: `SELECT LAST_INSERT_ID();`
        })
        return newBottleEntry[0]['LAST_INSERT_ID()']
    })
}

export function deleteBottlesDb (optionalConnection: OptionalConnection, data: number[]): Promise<undefined> {
    return queryHandler(optionalConnection, async function (connection: PoolConnection) {
        await query<any>(connection, {
            sql: `DELETE FROM cellar_bottles WHERE id IN (` + data.join(',') + `)`
        })
    })
}

export function archiveBottlesDb (optionalConnection: OptionalConnection, bottleIds: number[]): Promise<undefined> {
    return queryHandler(optionalConnection, async function (connection: PoolConnection) {
        await query<any>(connection, {
            sql: `UPDATE cellar_bottles SET archived = 1 WHERE id IN (` + bottleIds.join(',') + `)`
        })
    })
}
