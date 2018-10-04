import { queryHandler, query, OptionalConnection, extractSingle } from './connection'
import { PoolConnection } from 'mysql'
import { UserDb, UserApi } from '../models/user';

export function getUserByUsername (optionalConnection: OptionalConnection, email: string): Promise<UserDb | null> {
  return queryHandler(optionalConnection, async function (connection: PoolConnection) {
    const user = await query<UserDb[]>(connection, {
        sql: `SELECT * FROM users WHERE username = ?`,
        values: [email]
    })
    return extractSingle<UserDb>(user)
  })
}

export function getUserById (optionalConnection: OptionalConnection, id: number): Promise<UserDb | null> {
  return queryHandler(optionalConnection, async function (connection: PoolConnection) {
    const user = await query<UserDb[]>(connection, {
        sql: `SELECT * FROM users WHERE id = ?`,
        values: [String(id)]
    })
    return extractSingle<UserDb>(user)
  })
}

export function getUsersByCompanyId (optionalConnection: OptionalConnection, companyId: number): Promise<UserDb[]> {
  return queryHandler(optionalConnection, async function (connection: PoolConnection) {
    const users = await query<UserApi[]>(connection, {
        sql: `SELECT * FROM users WHERE company_id = ?`,
        values: [companyId]
    })
    return users
  })
}
