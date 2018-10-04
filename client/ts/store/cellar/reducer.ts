import { combineReducers } from 'redux'
import { CellarActionTypes, Actions } from './action';

import { WineDb as WineModel, WineNoIdDb, WineDb } from '../../../../src/models/wine'
import { Bin as BinModel, BinType as BinTypeModel } from '../../../../src/models/bin'
import { Wall as WallModel } from '../../../../src/models/wall'

const bottles = (
    state = [] as WineModel[],
    action: Actions
    ): typeof state => {
    switch (action.type) {
      case CellarActionTypes.SET_BOTTLES:
        return action.wine
      default:
        return state
    }
}

const bottle = (
  state = {
    id: null as null | number,
  },
  action: Actions
): typeof state => {
  switch (action.type) {
    case CellarActionTypes.CHANGE_ACTIVE_BOTTLE:
      return {
        ...state,
        id: action.bottleId
      }
    default:
      return state
  }
}

const selectedBottle = (
  state = {
    bottle: null as null | WineModel
  },
  action: Actions
): typeof state => {
  switch (action.type) {
    case CellarActionTypes.CHANGE_SELECTED_BOTTLE:
      return {
        ...state,
        bottle: action.bottle
      }
    default:
      return state
  }
}

export type TempBottle = WineNoIdDb & {selectInd: number}
const tempBottles = (
  state = {
    bottles: [] as TempBottle[]
  },
  action: Actions
): typeof state => {
  switch (action.type) {
    case CellarActionTypes.SET_WINES_TO_ADD:
      return {
        ...state,
        bottles: action.bottles
      }
    default:
      return state
  }
}

const moveBottles = (
  state = {
    bottles: null as null | WineDb[]
  },
  action: Actions
): typeof state => {
  switch (action.type) {
    case CellarActionTypes.SET_WINES_TO_MOVE:
      return {
        ...state,
        bottles: action.bottles
      }
    default:
      return state
  }
}

const bins = (
  state = [] as BinModel[],
  action: Actions
): typeof state => {
  switch (action.type) {
    case CellarActionTypes.SET_BINS:
      return action.bins
    default:
      return state
  }
}

const binTypes = (
  state = [] as BinTypeModel[],
  action: Actions
): typeof state => {
  switch (action.type) {
    case CellarActionTypes.SET_BIN_TYPES:
      return action.bin_types
    default:
      return state
  }
}

export type SelectedBin = {id: number | null, qty: number, cellar_until: string}
const selectedBins = (
  state = {
    bins: [] as SelectedBin[],
    selectedIndex: 0 as number
  },
  action: Actions
): typeof state => {
  switch (action.type) {
    case CellarActionTypes.CHANGE_SELECTED_BIN:
      return {...state, bins: action.bins}
    case CellarActionTypes.CHANGE_SELECTED_INDEX:
      return {...state, selectedIndex: action.ind}
    default:
      return state
  }
}

const walls = (
    state = [] as WallModel[],
    action: Actions
    ): typeof state => {
    switch (action.type) {
      case CellarActionTypes.SET_WALLS:
        return action.walls
      default:
        return state
    }
}

export default combineReducers({
  walls,
  bottles,
  bottle,
  tempBottles,
  moveBottles,
  selectedBottle,
  bins,
  binTypes,
  selectedBins
})
