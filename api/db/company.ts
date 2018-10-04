import { queryHandler, query, OptionalConnection, extractSingle } from './connection'
import { PoolConnection } from 'mysql'
import { CompanyDb } from '../models/company';

export function getCompanyById (optionalConnection: OptionalConnection, id: number): Promise<CompanyDb | null> {
  return queryHandler(optionalConnection, async function (connection: PoolConnection) {
    const company = await query<CompanyDb[]>(connection, {
        sql: `SELECT * FROM companies WHERE id = ?`,
        values: [String(id)]
    })
    return extractSingle<CompanyDb>(company)
  })
}
