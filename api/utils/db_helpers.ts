import * as _ from 'lodash'
import { PoolConnection } from 'mysql';

export function isValidId(id: number | null | undefined) {
    return _.isNumber(id) && id !== 0
}

export function escapeJsonParam(connection: PoolConnection, parameter: string) {
    let str = connection.escape(parameter)
    str = '"' + str.slice(1, str.length - 1) + '"'

    return str
}
