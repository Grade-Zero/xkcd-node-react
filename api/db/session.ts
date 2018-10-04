import { queryHandler, query, OptionalConnection, extractSingle } from './connection'
import { PoolConnection } from 'mysql'
import { SessionDb } from '../models/session';

export function getSessionById (optionalConnection: OptionalConnection, id: string): Promise<SessionDb | null> {
  return queryHandler(optionalConnection, async function (connection: PoolConnection) {
    const user = await query<SessionDb[]>(connection, {
        sql: `SELECT * FROM sessions WHERE id = ?`,
        values: [id]
    })
    return extractSingle<SessionDb>(user)
  })
}

export function createSession (optionalConnection: OptionalConnection, session: SessionDb): Promise<string> {
  return queryHandler(optionalConnection, async function (client: PoolConnection) {
    await query<any[]>(client, {
        sql: `INSERT INTO sessions SET ?;`,
    }, session)
    return session.id
  })
}

export function invalidateSession (optionalConnection: OptionalConnection, sessionId: string): Promise<boolean> {
  return queryHandler(optionalConnection, async function (client: PoolConnection) {
    await query<any[]>(client, {
        sql: `UPDATE sessions SET deactivated = ? where id = ?;`,
        values: [true, sessionId]
    })
    return true
  })
}
