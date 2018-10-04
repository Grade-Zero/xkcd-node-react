import { CellarDb } from '../../../../src/models/cellar'
import { WineDb as WineModel, WineNoIdDb, WineDb } from '../../../../src/models/wine'
import { Bin as BinModel, BinType as BinTypeModel } from '../../../../src/models/bin'
import { Wall as WallModel } from '../../../../src/models/wall'
import { SelectedBin, TempBottle } from './reducer';

export enum CellarActionTypes {
    SET_CELLAR = 'SET_CELLAR',
    SET_BOTTLES = 'SET_BOTTLES',
    SET_BINS = 'SET_BINS',
    SET_BIN_TYPES = 'SET_BIN_TYPES',
    SET_WALLS = 'SET_WALLS',
    CHANGE_ACTIVE_BOTTLE = 'CHANGE_ACTIVE_BOTTLE',
    CHANGE_SELECTED_BOTTLE = 'CHANGE_SELECTED_BOTTLE',
    CHANGE_SELECTED_BIN = 'CHANGE_SELECTED_BIN',
    CHANGE_SELECTED_INDEX = 'CHANGE_SELECTED_INDEX',
    SET_WINES_TO_ADD = 'SET_WINES_TO_ADD',
    SET_WINES_TO_MOVE = 'SET_WINES_TO_MOVE',
    CONFIRM_BOTTLES_TO_MOVE = 'CONFIRM_BOTTLES_TO_MOVE',
    ARCHIVE_BOTTLES = 'ARCHIVE_BOTTLES'
}

export const actions = {
    setCellar: (cellar: CellarDb) => ({
        type: CellarActionTypes.SET_CELLAR as CellarActionTypes.SET_CELLAR,
        cellar: cellar
    }),
    setBottles : (items: WineModel[]) => ({
        type: CellarActionTypes.SET_BOTTLES as CellarActionTypes.SET_BOTTLES,
        wine: items
    }),
    setBins : (items: BinModel[]) => ({
        type: CellarActionTypes.SET_BINS as CellarActionTypes.SET_BINS,
        bins: items
    }),
    setBinTypes : (items: BinTypeModel[]) => ({
        type: CellarActionTypes.SET_BIN_TYPES as CellarActionTypes.SET_BIN_TYPES,
        bin_types: items
    }),
    setWalls : (items: WallModel[]) => ({
        type: CellarActionTypes.SET_WALLS as CellarActionTypes.SET_WALLS,
        walls: items
    }),
    changeActiveBottle : (bottleId: number | null) => ({
        type: CellarActionTypes.CHANGE_ACTIVE_BOTTLE as CellarActionTypes.CHANGE_ACTIVE_BOTTLE,
        bottleId: bottleId
    }),
    changeSelectedBottle : (bottle: WineModel | null) => ({
        type: CellarActionTypes.CHANGE_SELECTED_BOTTLE   as CellarActionTypes.CHANGE_SELECTED_BOTTLE,
        bottle: bottle
    }),
    changeSelectedBins : (bins: SelectedBin[]) => ({
        type: CellarActionTypes.CHANGE_SELECTED_BIN as CellarActionTypes.CHANGE_SELECTED_BIN,
        bins: bins
    }),
    changeSelectedBinsIndex : (ind: number) => ({
        type: CellarActionTypes.CHANGE_SELECTED_INDEX as CellarActionTypes.CHANGE_SELECTED_INDEX,
        ind: ind
    }),
    setNewBottles: (bottles: TempBottle[]) => ({
        type: CellarActionTypes.SET_WINES_TO_ADD as CellarActionTypes.SET_WINES_TO_ADD,
        bottles: bottles
    }),
    setBottlesToMove: (bottles: WineDb[] | null) => ({
        type: CellarActionTypes.SET_WINES_TO_MOVE as CellarActionTypes.SET_WINES_TO_MOVE,
        bottles: bottles
    }),
    archiveBottles: (bottles: WineDb[]) => ({
        type: CellarActionTypes.ARCHIVE_BOTTLES as CellarActionTypes.ARCHIVE_BOTTLES,
        bottles: bottles
    })
}

export type Actions = ReturnType<typeof actions[keyof typeof actions]>
