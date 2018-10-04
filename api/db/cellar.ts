import { OptionalConnection, queryHandler, query } from './connection'
import { PoolConnection } from 'mysql'
import { CellarDb } from '../models/cellar';

export function getCellarByCompanyId (optionalConnection: OptionalConnection, companyId: number): Promise<CellarDb[]> {
    return queryHandler(optionalConnection, async function (connection: PoolConnection) {
      const dataQuery = await query<CellarDb[]>(connection, {
          sql: `SELECT * FROM cellar WHERE company_id = ? ORDER BY id`,
          values: [companyId]
      })
      return dataQuery
    })
  }
