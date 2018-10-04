import { queryHandler, query, OptionalConnection, extractSingle } from './connection'
import { PoolConnection } from 'mysql'
import { Wall } from '../models/wall';
import { InsertId } from '../models/standard';
import { escapeJsonParam } from '../utils/db_helpers';

export function fetchAllWalls (optionalConnection: OptionalConnection): Promise<Wall[]> {
    return queryHandler(optionalConnection, async function (connection: PoolConnection) {
      const dataQuery = await query<Wall[]>(connection, {
          sql: `SELECT * FROM cellar_walls ORDER BY id`
      })
      return dataQuery
    })
}

export function fetchWallsByCompanyId (optionalConnection: OptionalConnection, companyId: number): Promise<Wall[]> {
    return queryHandler(optionalConnection, async function (connection: PoolConnection) {
      const dataQuery = await query<Wall[]>(connection, {
          sql: `SELECT * FROM cellar_walls WHERE company_id = ? ORDER BY id`,
          values: [companyId]
      })
      return dataQuery
    })
  }

export function fetchWallsByCellarId (optionalConnection: OptionalConnection, cellarId: number): Promise<Wall[]> {
    return queryHandler(optionalConnection, async function (connection: PoolConnection) {
      const dataQuery = await query<Wall[]>(connection, {
          sql: `SELECT * FROM cellar_walls WHERE cellar_id = ? ORDER BY id`,
          values: [cellarId]
      })
      return dataQuery
    })
  }
