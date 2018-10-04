import { combineReducers } from 'redux'
import { Actions, ModalActionTypes, SearchActionTypes, UiActionTypes, FilterActionTypes, FormActionTypes } from './action'
import { ModalType } from './models';

const search = (
  state = {
    term: ''
  },
  action: Actions
): typeof state => {
  switch (action.type) {
    case SearchActionTypes.CHANGE_SEARCH_TERM:
      return {
        ...state,
        term: action.searchTerm
      }
    case UiActionTypes.RESET_UI_STATE: {
      return { term: '' }
    }
    default:
      return state
  }
}

const binScale = (
  state = {
    scale: 20
  },
  action: Actions
): typeof state => {
  switch (action.type) {
    case UiActionTypes.CHANGE_BIN_SCALE:
      return {
        ...state,
        scale: action.scale
      }
    default:
      return state
  }
}

const filter = (
  state = {
    vineyard: null as any,
    color: null as any,
    year: null as any,
    country: null as any,
    type: null as any,
    cellar_until: null as any,
    expiry: null as any,
    rating: null as any,
    name: null as any
  },
  action: Actions
): typeof state => {
  switch (action.type) {
    case FilterActionTypes.CHANGE_VINEYARD_FILTER:
      return {
        ...state,
        vineyard: action.id
      }
    case FilterActionTypes.CHANGE_COLOR_FILTER:
      return {
        ...state,
        color: action.id
      }
    case FilterActionTypes.CHANGE_YEAR_FILTER:
      return {
        ...state,
        year: action.id
      }
    case FilterActionTypes.CHANGE_COUNTRY_FILTER:
      return {
        ...state,
        country: action.id
      }
    case FilterActionTypes.CHANGE_TYPE_FILTER:
      return {
        ...state,
        type: action.id
      }
    case FilterActionTypes.CHANGE_CELLAR_UNTIL_FILTER:
      return {
        ...state,
        cellar_until: action.id
      }
    case FilterActionTypes.CHANGE_EXPIRY_FILTER:
      return {
        ...state,
        expiry: action.id
      }
    case FilterActionTypes.CHANGE_RATING_FILTER:
      return {
        ...state,
        rating: action.id
      }
    case FilterActionTypes.CHANGE_NAME_FILTER:
      return {
        ...state,
        name: action.id
      }
    default:
      return state
  }
}

const binFilter = (
  state = {
    space: null as any,
    type: null as any
  },
  action: Actions
): typeof state => {
  switch (action.type) {
    case FilterActionTypes.CHANGE_BIN_CAPACITY_FILTER:
      return {
        ...state,
        space: action.space
      }
    case FilterActionTypes.CHANGE_BIN_TYPE_FILTER:
      return {
        ...state,
        type: action.binType
      }
    case UiActionTypes.RESET_UI_STATE: {
      return {
        space: null,
        type: null
      }
    }
    default:
      return state
  }
}

const wallFilter = (
  state = {
    wall: null as any
  },
  action: Actions
): typeof state => {
  switch (action.type) {
    case FilterActionTypes.CHANGE_WALL_FILTER:
      return {
        ...state,
        wall: action.wall
      }
    default:
      return state
  }
}

const form = (
  state = {
    active: false,
    quantity: undefined as undefined | number
  },
  action: Actions
): typeof state => {
  switch (action.type) {
    case FormActionTypes.ADD_WINE_FORM_ACTIVE:
      return {
        ...state,
        active: action.active
      }
    case FormActionTypes.SET_ADD_QUANTITY:
      return {
        ...state,
        quantity: action.quantity
      }
    default:
      return state
  }
}

const formData = (
  state = {
    fields: null as any
  },
  action: Actions
): typeof state => {
  switch (action.type) {
    case FormActionTypes.UPDATE_FORM_DATA:
      return {
        ...state,
        fields: action.fields
      }
    default:
      return state
  }
}

const edit = (
  state = {
    edit: false,
  },
  action: Actions
): typeof state => {
  switch (action.type) {
    case UiActionTypes.SET_EDIT_MODE:
      return {
        edit: action.value
      }
    default:
      return state
  }
}

const move = (
  state = {
    move: false
  },
  action: Actions
): typeof state => {
  switch (action.type) {
    case UiActionTypes.SET_MOVE_MODE:
      return {
        move: action.value
      }
    default:
      return state
  }
}

const defaultModal = {
  modalType: ModalType.bottle,
  open: false,
  meta: {} as any
}

export type Modal = typeof defaultModal
const modal = (
    state = defaultModal,
    action: Actions
  ): typeof state => {
  switch (action.type) {
    case ModalActionTypes.OPEN_MODAL:
      return {
        open: true,
        modalType: action.modalType,
        meta: action.meta
      }
    case ModalActionTypes.CLOSE_MODAL:
      return defaultModal
    default:
      return state
  }
}

export default combineReducers({
    modal,
    search,
    wallFilter,
    binFilter,
    form,
    formData,
    filter,
    edit,
    binScale,
    move
})
