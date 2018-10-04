import * as _ from 'lodash'
import { fetchAllWine, fetchWineByBin, insertSingleBottle, deleteBottlesDb, fetchWineByCompanyId, archiveBottlesDb } from '../db/wine';
import { WineDb, WineNoIdDb, WineMove } from '../models/wine';
const mkdirp = require('mkdirp')
import { getUserById } from '../db/user';
import { queryHandler } from '../db/connection';
import { PoolConnection } from 'mysql';

export async function getAllWine(): Promise<WineDb[]> {
    return fetchAllWine(null);
}

export async function getWineByBin(bin: number): Promise<WineDb[]> {
    return fetchWineByBin(null, bin)
}

export async function getWineByUserId(userId: number): Promise<WineDb[]> {
    let user = await getUserById(null, userId)
    if (!user) {
        return []
    }
    return fetchWineByCompanyId(null, user.company_id)
}

export async function addBottles(formData: WineNoIdDb[]): Promise<boolean> {
    return queryHandler(null, async function (client: PoolConnection) {
        let ids = await Promise.all(_.map(formData, (bottle: WineNoIdDb) => {
            return insertSingleBottle(client, bottle)
        }))
        return ids
    })
}

export async function deleteBottles(bottles: WineDb[]): Promise<undefined> {
    let ids: number[] = bottles.map((bottle) => bottle.id)
    return deleteBottlesDb(null, ids)
}

export async function moveBottles(bottles: WineMove): Promise<undefined> {
    let remove: WineDb[] = bottles.remove
    let insert: WineNoIdDb[] = bottles.remove
    let deleted = await deleteBottles(remove)
    let inserted = await addBottles(insert)
    return deleted
}

export async function archiveBottles(bottles: WineDb[]): Promise<undefined> {
    let archivedBottles = _.map(bottles, (bottle: WineDb) => {
        return {...bottle, archived: 1}
    })
    let ids: number[] = archivedBottles.map((bottle) => bottle.id)
    archiveBottlesDb(null, ids)
    return undefined
}
