import * as _ from 'lodash'
import { fetchAllWalls, fetchWallsByCompanyId, fetchWallsByCellarId } from '../db/wall';
import { fetchAllBins, fetchBinTypes, fetchBinsByCompanyId } from '../db/bin';
import { fetchWineByBin, fetchAllWine, fetchWineByCompanyId } from '../db/wine';
import { Wall } from '../models/wall'
import { Bin, BinType, BottlePosition, BinBottlePosition } from '../models/bin'
import { WineDb } from '../models/wine';
import { getUserById } from '../db/user';


export async function getAllWalls(): Promise<Wall[]> {
    let walls: Wall[] = await fetchAllWalls(null)
    let bins: Bin[] = await fetchAllBins(null)
    let binTypes: BinType[] = await fetchBinTypes(null)
    let bottles: WineDb[] = await fetchAllWine(null)

    let bwt = getBinsWithType(bins, binTypes)
    let binsWithBottles = _.map(bwt, (bin, i: number) => {
        let available: BinBottlePosition[] = _.cloneDeep(binBottleCoordsSingle)
        if ((bin.bin_type) && bin.bin_type.type_name === 'double') {
            available = _.cloneDeep(binBottleCoordsDouble)
        }
        let taken: BinBottlePosition[] = []
        let binBottles: WineDb[] = _.filter(bottles, {bin_id: bin.id})
        _.map(binBottles, (binBottle: WineDb, ii: number) => {
            let pos: BinBottlePosition = _.find(available, {coordinate_x: binBottle.coordinate_x, coordinate_y: binBottle.coordinate_y, available: true}) as BinBottlePosition
            if (!_.isNil(pos)) {
                pos = {...pos, bottle: binBottle, available: false}
                let posIndex = _.findIndex(available, {coordinate_x: pos.coordinate_x, coordinate_y: pos.coordinate_y})
                available[posIndex] = pos
            }
        })
        bin = {...bin, available_positions: available}
        bin.active = true
        bottles = _.orderBy(bottles, ['coordinate'], ['asc'])
        return {...bin, bottles: _.filter(bottles, (bottle: WineDb) => bottle.bin_id === bin.id)}
    })
    let wallsWithBins = _.map(walls, (wall: Wall, index: number) => {
        wall.active = true
        return {...wall, bins: _.filter(binsWithBottles, (bin) => bin.wall_id === wall.id)}
    })

    return wallsWithBins
}

export async function getWallsByCellarId(cellarId: number): Promise<Wall[]> {
    let walls: Wall[] = await fetchWallsByCellarId(null, cellarId)
    let bins: Bin[] = await fetchAllBins(null)
    let binTypes: BinType[] = await fetchBinTypes(null)
    let bottles: WineDb[] = await fetchAllWine(null)

    let bwt = getBinsWithType(bins, binTypes)
    let binsWithBottles = _.map(bwt, (bin, i: number) => {
        let available: BinBottlePosition[] = _.cloneDeep(binBottleCoordsSingle)
        if ((bin.bin_type) && bin.bin_type.type_name === 'double') {
            available = _.cloneDeep(binBottleCoordsDouble)
        }
        let taken: BinBottlePosition[] = []
        let binBottles: WineDb[] = _.filter(bottles, {bin_id: bin.id})
        _.map(binBottles, (binBottle: WineDb, ii: number) => {
            let pos: BinBottlePosition = _.find(available, {coordinate_x: binBottle.coordinate_x, coordinate_y: binBottle.coordinate_y, available: true}) as BinBottlePosition
            if (!_.isNil(pos)) {
                pos = {...pos, bottle: binBottle, available: false}
                let posIndex = _.findIndex(available, {coordinate_x: pos.coordinate_x, coordinate_y: pos.coordinate_y})
                available[posIndex] = pos
            }
        })
        bin = {...bin, available_positions: available}
        bin.active = true
        bottles = _.orderBy(bottles, ['coordinate'], ['asc'])
        return {...bin, bottles: _.filter(bottles, (bottle: WineDb) => bottle.bin_id === bin.id)}
    })
    let wallsWithBins = _.map(walls, (wall: Wall, index: number) => {
        wall.active = true
        return {...wall, bins: _.filter(binsWithBottles, (bin) => bin.wall_id === wall.id)}
    })

    return wallsWithBins
}

export async function getWallsByUserId(userId: number): Promise<Wall[]> {
    let user = await getUserById(null, userId)
    if (!user) {
        return []
    }
    let walls: Wall[] = await fetchWallsByCompanyId(null, user.company_id)
    let bins: Bin[] = await fetchBinsByCompanyId(null, user.company_id)
    let binTypes: BinType[] = await fetchBinTypes(null)
    let bottles: WineDb[] = await fetchWineByCompanyId(null, user.company_id)

    let bwt = getBinsWithType(bins, binTypes)
    let binsWithBottles = _.map(bwt, (bin, i: number) => {
        let available: BinBottlePosition[] = _.cloneDeep(binBottleCoordsSingle)
        if ((bin.bin_type) && bin.bin_type.type_name === 'double') {
            available = _.cloneDeep(binBottleCoordsDouble)
        }
        let taken: BinBottlePosition[] = []
        let binBottles: WineDb[] = _.filter(bottles, {bin_id: bin.id})
        _.map(binBottles, (binBottle: WineDb, ii: number) => {
            let pos: BinBottlePosition = _.find(available, {coordinate_x: binBottle.coordinate_x, coordinate_y: binBottle.coordinate_y, available: true}) as BinBottlePosition
            if (!_.isNil(pos)) {
                pos = {...pos, bottle: binBottle, available: false}
                let posIndex = _.findIndex(available, {coordinate_x: pos.coordinate_x, coordinate_y: pos.coordinate_y})
                available[posIndex] = pos
            }
        })
        bin = {...bin, available_positions: available}
        bin.active = true
        bottles = _.orderBy(bottles, ['coordinate'], ['asc'])
        return {...bin, bottles: _.filter(bottles, (bottle: WineDb) => bottle.bin_id === bin.id)}
    })
    let wallsWithBins = _.map(walls, (wall: Wall, index: number) => {
        wall.active = true
        return {...wall, bins: _.filter(binsWithBottles, (bin) => bin.wall_id === wall.id)}
    })

    return wallsWithBins
}

function getBinsWithType(bins: Bin[], types: BinType[]) {
    let binsWithType = _.map(bins, (bin: Bin, i: number) => {
        return {...bin, bin_type: _.find(types, (type: BinType) => Number(type.id) === Number(bin.type))}
    })

    return binsWithType
}

function orderBottlePositions(bottles: WineDb[]) {
    return bottles
}

export let binCoords: BottlePosition[] = [
    {
        coordinate_x: 'a',
        coordinate_y: '1',
        available: true
    },
    {
        coordinate_x: 'b',
        coordinate_y: '1',
        available: true
    },
    {
        coordinate_x: 'c',
        coordinate_y: '1',
        available: true
    },
    {
        coordinate_x: 'd',
        coordinate_y: '1',
        available: true
    },
    {
        coordinate_x: 'a',
        coordinate_y: '2',
        available: true
    },
    {
        coordinate_x: 'b',
        coordinate_y: '2',
        available: true
    },
    {
        coordinate_x: 'c',
        coordinate_y: '2',
        available: true
    },
    {
        coordinate_x: 'd',
        coordinate_y: '2',
        available: true
    },
    {
        coordinate_x: 'a',
        coordinate_y: '3',
        available: true
    },
    {
        coordinate_x: 'b',
        coordinate_y: '3',
        available: true
    },
    {
        coordinate_x: 'c',
        coordinate_y: '3',
        available: true
    },
    {
        coordinate_x: 'd',
        coordinate_y: '3',
        available: true
    }
]

export let binBottleCoordsSingle: BinBottlePosition[] = [
    {
        coordinate_x: 'a',
        coordinate_y: '1',
        available: true,
        bottle: null,
        temp: false
    },
    {
        coordinate_x: 'b',
        coordinate_y: '1',
        available: true,
        bottle: null,
        temp: false
    },
    {
        coordinate_x: 'c',
        coordinate_y: '1',
        available: true,
        bottle: null,
        temp: false
    },
    {
        coordinate_x: 'd',
        coordinate_y: '1',
        available: true,
        bottle: null,
        temp: false
    },
    {
        coordinate_x: 'a',
        coordinate_y: '2',
        available: true,
        bottle: null,
        temp: false
    },
    {
        coordinate_x: 'b',
        coordinate_y: '2',
        available: true,
        bottle: null,
        temp: false
    },
    {
        coordinate_x: 'c',
        coordinate_y: '2',
        available: true,
        bottle: null,
        temp: false
    },
    {
        coordinate_x: 'd',
        coordinate_y: '2',
        available: true,
        bottle: null,
        temp: false
    },
    {
        coordinate_x: 'a',
        coordinate_y: '3',
        available: true,
        bottle: null,
        temp: false
    },
    {
        coordinate_x: 'b',
        coordinate_y: '3',
        available: true,
        bottle: null,
        temp: false
    },
    {
        coordinate_x: 'c',
        coordinate_y: '3',
        available: true,
        bottle: null,
        temp: false
    },
    {
        coordinate_x: 'd',
        coordinate_y: '3',
        available: true,
        bottle: null,
        temp: false
    }
]

export let binBottleCoordsDouble: BinBottlePosition[] = [
    {
        coordinate_x: 'a',
        coordinate_y: '1',
        available: true,
        bottle: null,
        temp: false
    },
    {
        coordinate_x: 'b',
        coordinate_y: '1',
        available: true,
        bottle: null,
        temp: false
    },
    {
        coordinate_x: 'c',
        coordinate_y: '1',
        available: true,
        bottle: null,
        temp: false
    },
    {
        coordinate_x: 'd',
        coordinate_y: '1',
        available: true,
        bottle: null,
        temp: false
    },
    {
        coordinate_x: 'a',
        coordinate_y: '2',
        available: true,
        bottle: null,
        temp: false
    },
    {
        coordinate_x: 'b',
        coordinate_y: '2',
        available: true,
        bottle: null,
        temp: false
    },
    {
        coordinate_x: 'c',
        coordinate_y: '2',
        available: true,
        bottle: null,
        temp: false
    },
    {
        coordinate_x: 'd',
        coordinate_y: '2',
        available: true,
        bottle: null,
        temp: false
    },
    {
        coordinate_x: 'a',
        coordinate_y: '3',
        available: true,
        bottle: null,
        temp: false
    },
    {
        coordinate_x: 'b',
        coordinate_y: '3',
        available: true,
        bottle: null,
        temp: false
    },
    {
        coordinate_x: 'c',
        coordinate_y: '3',
        available: true,
        bottle: null,
        temp: false
    },
    {
        coordinate_x: 'd',
        coordinate_y: '3',
        available: true,
        bottle: null,
        temp: false
    },
    {
        coordinate_x: 'a',
        coordinate_y: '4',
        available: true,
        bottle: null,
        temp: false
    },
    {
        coordinate_x: 'b',
        coordinate_y: '4',
        available: true,
        bottle: null,
        temp: false
    },
    {
        coordinate_x: 'c',
        coordinate_y: '4',
        available: true,
        bottle: null,
        temp: false
    },
    {
        coordinate_x: 'd',
        coordinate_y: '4',
        available: true,
        bottle: null,
        temp: false
    },
    {
        coordinate_x: 'a',
        coordinate_y: '5',
        available: true,
        bottle: null,
        temp: false
    },
    {
        coordinate_x: 'b',
        coordinate_y: '5',
        available: true,
        bottle: null,
        temp: false
    },
    {
        coordinate_x: 'c',
        coordinate_y: '5',
        available: true,
        bottle: null,
        temp: false
    },
    {
        coordinate_x: 'd',
        coordinate_y: '5',
        available: true,
        bottle: null,
        temp: false
    },
    {
        coordinate_x: 'a',
        coordinate_y: '6',
        available: true,
        bottle: null,
        temp: false
    },
    {
        coordinate_x: 'b',
        coordinate_y: '6',
        available: true,
        bottle: null,
        temp: false
    },
    {
        coordinate_x: 'c',
        coordinate_y: '6',
        available: true,
        bottle: null,
        temp: false
    },
    {
        coordinate_x: 'd',
        coordinate_y: '6',
        available: true,
        bottle: null,
        temp: false
    }
]
