import { queryHandler, query, OptionalConnection, extractSingle } from './connection'
import { PoolConnection } from 'mysql'
import { Bin, BinType, BinDb } from '../models/bin';
import { InsertId } from '../models/standard';
import { escapeJsonParam } from '../utils/db_helpers';

export function fetchAllBins (optionalConnection: OptionalConnection): Promise<Bin[]> {
    return queryHandler(optionalConnection, async function (connection: PoolConnection) {
      const dataQuery = await query<Bin[]>(connection, {
          sql: `SELECT * FROM cellar_bins ORDER BY id`
      })
      return dataQuery
    })
}

export function fetchBinById (optionalConnection: OptionalConnection, binId: number): Promise<Bin> {
    return queryHandler(optionalConnection, async function (connection: PoolConnection) {
      const dataQuery = await query<Bin[]>(connection, {
          sql: `SELECT * FROM cellar_bins WHERE id = ?`,
          values: [String(binId)]
      })
      return extractSingle<Bin>(dataQuery)
    })
}

export function fetchBinsByCompanyId (optionalConnection: OptionalConnection, companyId: number): Promise<Bin[]> {
    return queryHandler(optionalConnection, async function (connection: PoolConnection) {
      const dataQuery = await query<Bin[]>(connection, {
          sql: `SELECT * FROM cellar_bins WHERE company_id = ? ORDER BY id`,
          values: [String(companyId)]
      })
      return dataQuery
    })
}

export function fetchBinTypes (optionalConnection: OptionalConnection): Promise<BinType[]> {
    return queryHandler(optionalConnection, async function (connection: PoolConnection) {
      const dataQuery = await query<BinType[]>(connection, {
          sql: `SELECT * FROM cellar_bin_types ORDER BY id`
      })
      return dataQuery
    })
}

export function updateBinDb (optionalConnection: OptionalConnection, bin: BinDb): Promise<undefined> {
    return queryHandler(optionalConnection, async function (connection: PoolConnection) {
        await query<any>(connection, {
            sql: `UPDATE cellar_bins SET
                company_id = ?,
                wall_id = ?,
                name = ?,
                type = ?,
                coordinate_x = ?,
                coordinate_y = ?
                WHERE id = ?`,
            values: [bin.company_id, bin.wall_id, String(bin.name), String(bin.type), String(bin.coordinate_x), String(bin.coordinate_y), bin.id]
        })
    })
}
