import { queryHandler, query, OptionalConnection, extractSingle } from './connection'
import { PoolConnection } from 'mysql'
import { UserDb, UserApi, UserNoIdDb } from '../models/user';
import { InsertId } from '../models/standard';

export function getUserByUsername (optionalConnection: OptionalConnection, username: string): Promise<UserDb | null> {
  return queryHandler(optionalConnection, async function (connection: PoolConnection) {
    const user = await query<UserDb[]>(connection, {
        sql: `SELECT * FROM users WHERE username = ?`,
        values: [username, username]
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

export function updateUserPin (optionalConnection: OptionalConnection, userId: number, pin: string): Promise<undefined> {
  return queryHandler(optionalConnection, async function (connection: PoolConnection) {
      await query<any>(connection, {
          sql: `UPDATE users SET pin = ? WHERE id = ?`,
          values: [String(pin), userId]
      })
  })
}

export function updateUserPassword (optionalConnection: OptionalConnection, userId: number, password: string): Promise<undefined> {
  return queryHandler(optionalConnection, async function (connection: PoolConnection) {
      await query<any>(connection, {
          sql: `UPDATE users SET password = ? WHERE id = ?`,
          values: [String(password), userId]
      })
  })
}

export function createNewUser (optionalConnection: OptionalConnection, userData: UserNoIdDb): Promise<string> {
  return queryHandler(optionalConnection, async function (client: PoolConnection) {
    await query<any[]>(client, {
        sql: `INSERT INTO users SET ?;`,
    }, userData)
    const newUserEntry = await query<InsertId[]>(client, {
      sql: `SELECT LAST_INSERT_ID();`
    })
    return newUserEntry[0]['LAST_INSERT_ID()']
  })
}

export function removeUser (optionalConnection: OptionalConnection, userId: number): Promise<undefined> {
  return queryHandler(optionalConnection, async function (connection: PoolConnection) {
      await query<any>(connection, {
          sql: `DELETE FROM users WHERE id = ?`,
          values: [userId]
      })
  })
}
