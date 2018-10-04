import * as _ from 'lodash'
import { fetchAllBins, fetchBinTypes, fetchBinsByCompanyId, fetchBinById, updateBinDb } from '../db/bin';
import { Bin, BinType, BinDb } from '../models/bin';
const mkdirp = require('mkdirp')
import { config } from '../config';
// import * as AWS from 'aws-sdk'
import {isUndefined} from 'util'
import { fetchWineByBin, fetchAllWine, fetchWineByCompanyId } from '../db/wine';
import { WineDb } from '../models/wine';
import { getUserById } from '../db/user';

export async function getAllBins(): Promise<Bin[]> {
    let bins = await fetchAllBins(null)
    let bottles = await fetchAllWine(null)

    let binsWithBottles = _.map(bins, (bin: Bin, index: number) => {
        return {...bin, bottles: _.filter(bottles, (bottle) => bottle.bin_id === bin.id)}
    })

    return binsWithBottles
}

export async function getBinTypes(): Promise<BinType[]> {
    return await fetchBinTypes(null)
}

export async function getBinById(binId: number): Promise<Bin> {
    return await fetchBinById(null, binId)
}

export async function getBinsByUserId(userId: number): Promise<Bin[]> {
    let user = await getUserById(null, userId)
    if (!user) {
        return []
    }
    let bins = await fetchBinsByCompanyId(null, user.company_id)
    let bottles = await fetchWineByCompanyId(null, user.company_id)

    let binsWithBottles = _.map(bins, (bin: Bin, index: number) => {
        return {...bin, bottles: _.filter(bottles, (bottle) => bottle.bin_id === bin.id)}
    })
    return binsWithBottles
}

export async function updateBin(bin: BinDb): Promise<undefined> {
    await updateBinDb(null, bin)
    return undefined
}

export async function getBottlesByBin(binId: number): Promise<WineDb[]> {
    return await fetchWineByBin(null, binId)
}
