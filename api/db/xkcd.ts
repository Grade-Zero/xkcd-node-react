import { Comic, ComicDb } from '../models/xkcd'
import { OptionalConnection, queryHandler, query } from './connection'
import { PoolConnection } from 'mysql';
import { InsertId } from '../models/standard';


export function insertComicDb(optionalConnection: OptionalConnection, data: Comic): Promise<string> {
    return queryHandler(optionalConnection, async function (client: PoolConnection) {
        await query<any[]>(client, {
            sql: `INSERT INTO comics SET ?;`,
        }, data)
        const newComicEntry = await query<InsertId[]>(client, {
            sql: `SELECT LAST_INSERT_ID();`
        })
        return newComicEntry[0]['LAST_INSERT_ID()']
    })
}

export function fetchComicsDb (optionalConnection: OptionalConnection, limit?: number): Promise<ComicDb[]> {
    return queryHandler(optionalConnection, async function (client: PoolConnection) {
      const comics = await query<ComicDb[]>(client, {
          sql: `SELECT * FROM comics LIMIT ?`,
          values: [limit]
      })
      return comics
    })
  }

export function fetchAllComicsDb (optionalConnection: OptionalConnection): Promise<ComicDb[]> {
    return queryHandler(optionalConnection, async function (client: PoolConnection) {
      const comics = await query<ComicDb[]>(client, {
          sql: `SELECT * FROM comics`
      })
      return comics
    })
  }
