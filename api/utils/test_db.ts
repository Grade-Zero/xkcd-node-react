import { queryHandler, query } from '../db/connection';
import * as _ from 'lodash'
import { PoolConnection } from 'mysql';
import { config } from '../config';

export async function freshDb() {
    if (!(config.database.host === 'localhost' && config.database.password === '')) {
        throw new Error('This should only be executed in a test environment, it will destroy the database')
    }
    return queryHandler(null, async function (client: PoolConnection) {
        let truncateTableSql = await query<any[]>(client, {
            sql: `
                SELECT Concat('TRUNCATE TABLE ',table_schema,'.',TABLE_NAME, ';')
                FROM INFORMATION_SCHEMA.TABLES where  table_schema in ('fusion');
            `,
        })
        let truncateSql = _.map(truncateTableSql, (table) => _.head(_.values(table)))
        await query<any[]>(client, {
            sql: `
            SET FOREIGN_KEY_CHECKS=0;
            `,
        })
        await Promise.all(_.map(truncateSql, (trunc: string) => {
            return query<any[]>(client, {
                sql: trunc,
            })
        }))
        await query<any[]>(client, {
            sql: `
            SET FOREIGN_KEY_CHECKS=1;
            `,
        })
    })
}

export async function validateResponse(err: Error | null, res: any, done: Function, assertions: Function) {
    try {
        if (err) {
            console.error(res.error);
            throw err;
        }
        await assertions()
        done()
    } catch (e) {
        done(e)
    }
}
