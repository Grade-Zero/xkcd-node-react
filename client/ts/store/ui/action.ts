import { ModalType } from './models'
import { WineAdd, WineNoIdDb } from '../../../../src/models/wine';

export enum InventoryActionTypes {
    TOGGLE_COLUMN = 'TOGGLE_COLUMN'
}

export enum ModalActionTypes {
    OPEN_MODAL = 'OPEN_MODAL',
    CLOSE_MODAL = 'CLOSE_MODAL'
}

export enum SearchActionTypes {
    CHANGE_SEARCH_TERM = 'CHANGE_SEARCH_TERM'
}

export enum FilterActionTypes {
    CHANGE_VINEYARD_FILTER = 'CHANGE_VINEYARD_FILTER',
    CHANGE_COLOR_FILTER = 'CHANGE_COLOR_FILTER',
    CHANGE_YEAR_FILTER = 'CHANGE_YEAR_FILTER',
    CHANGE_COUNTRY_FILTER = 'CHANGE_COUNTRY_FILTER',
    CHANGE_TYPE_FILTER = 'CHANGE_TYPE_FILTER',
    CHANGE_CELLAR_UNTIL_FILTER = 'CHANGE_CELLAR_UNTIL_FILTER',
    CHANGE_EXPIRY_FILTER = 'CHANGE_EXPIRY_FILTER',
    CHANGE_RATING_FILTER = 'CHANGE_RATING_FILTER',
    CHANGE_NAME_FILTER = 'CHANGE_NAME_FILTER',
    CHANGE_BIN_CAPACITY_FILTER = 'CHANGE_BIN_CAPACITY_FILTER',
    CHANGE_BIN_TYPE_FILTER = 'CHANGE_BIN_TYPE_FILTER',
    CHANGE_WALL_FILTER = 'CHANGE_WALL_FILTER'
}

export enum FormActionTypes {
    ADD_WINE_FORM_ACTIVE = 'ADD_WINE_FORM_ACTIVE',
    SET_ADD_QUANTITY = 'SET_ADD_QUANTITY',
    UPDATE_FORM_DATA = 'UPDATE_FORM_DATA'
}

export enum UiActionTypes {
    RESET_UI_STATE = 'RESET_UI_STATE',
    SET_EDIT_MODE = 'SET_EDIT_MODE',
    SET_MOVE_MODE = 'SET_MOVE_MODE',
    CHANGE_BIN_SCALE = 'CHANGE_BIN_SCALE'
}

export const actions = {
    openModal: (modalType: ModalType, meta: any) => ({
        type: ModalActionTypes.OPEN_MODAL as ModalActionTypes.OPEN_MODAL,
        modalType: modalType,
        meta: meta
    }),
    closeModal: () => ({
        type: ModalActionTypes.CLOSE_MODAL as ModalActionTypes.CLOSE_MODAL,
    }),
    changeSearchTerm: (searchTerm: string) => ({
        type: SearchActionTypes.CHANGE_SEARCH_TERM as SearchActionTypes.CHANGE_SEARCH_TERM,
        searchTerm: searchTerm
    }),
    changeBinCapacityFilter: (space: string | null) => ({
        type: FilterActionTypes.CHANGE_BIN_CAPACITY_FILTER as FilterActionTypes.CHANGE_BIN_CAPACITY_FILTER,
        space: space
    }),
    changeBinTypeFilter: (binType: string | null) => ({
        type: FilterActionTypes.CHANGE_BIN_TYPE_FILTER as FilterActionTypes.CHANGE_BIN_TYPE_FILTER,
        binType: binType
    }),
    changeWallFilter: (wall: string | null) => ({
        type: FilterActionTypes.CHANGE_WALL_FILTER as FilterActionTypes.CHANGE_WALL_FILTER,
        wall: wall
    }),
    changeVineyardFilter: (id: string | null) => ({
        type: FilterActionTypes.CHANGE_VINEYARD_FILTER as FilterActionTypes.CHANGE_VINEYARD_FILTER,
        id: id
    }),
    changeColorFilter: (id: string | null) => ({
        type: FilterActionTypes.CHANGE_COLOR_FILTER as FilterActionTypes.CHANGE_COLOR_FILTER,
        id: id
    }),
    changeYearFilter: (id: number | null) => ({
        type: FilterActionTypes.CHANGE_YEAR_FILTER as FilterActionTypes.CHANGE_YEAR_FILTER,
        id: id
    }),
    changeCountryFilter: (id: string | null) => ({
        type: FilterActionTypes.CHANGE_COUNTRY_FILTER as FilterActionTypes.CHANGE_COUNTRY_FILTER,
        id: id
    }),
    changeTypeFilter: (id: string | null) => ({
        type: FilterActionTypes.CHANGE_TYPE_FILTER as FilterActionTypes.CHANGE_TYPE_FILTER,
        id: id
    }),
    changeCellarUntilFilter: (id: string | null) => ({
        type: FilterActionTypes.CHANGE_CELLAR_UNTIL_FILTER as FilterActionTypes.CHANGE_CELLAR_UNTIL_FILTER,
        id: id
    }),
    changeExpiryFilter: (id: string | null) => ({
        type: FilterActionTypes.CHANGE_EXPIRY_FILTER as FilterActionTypes.CHANGE_EXPIRY_FILTER,
        id: id
    }),
    changeRatingFilter: (id: string | null) => ({
        type: FilterActionTypes.CHANGE_RATING_FILTER as FilterActionTypes.CHANGE_RATING_FILTER,
        id: id
    }),
    changeNameFilter: (id: string | null) => ({
        type: FilterActionTypes.CHANGE_NAME_FILTER as FilterActionTypes.CHANGE_NAME_FILTER,
        id: id
    }),
    changeWineFormActive: (active: boolean) => ({
        type: FormActionTypes.ADD_WINE_FORM_ACTIVE as FormActionTypes.ADD_WINE_FORM_ACTIVE,
        active: active
    }),
    updateWineInput: (fields: WineNoIdDb | null) => ({
        type: FormActionTypes.UPDATE_FORM_DATA as FormActionTypes.UPDATE_FORM_DATA,
        fields: fields
    }),
    setAddQuantity: (quantity: number | undefined) => ({
        type: FormActionTypes.SET_ADD_QUANTITY as FormActionTypes.SET_ADD_QUANTITY,
        quantity: quantity
    }),
    resetUiState: () => ({
        type: UiActionTypes.RESET_UI_STATE as UiActionTypes.RESET_UI_STATE
    }),
    setEditMode: (value: boolean) => ({
        type: UiActionTypes.SET_EDIT_MODE as UiActionTypes.SET_EDIT_MODE,
        value: value
    }),
    setMoveMode: (value: boolean) => ({
        type: UiActionTypes.SET_MOVE_MODE as UiActionTypes.SET_MOVE_MODE,
        value: value
    }),
    changeBinScale: (scale: number) => ({
        type: UiActionTypes.CHANGE_BIN_SCALE as UiActionTypes.CHANGE_BIN_SCALE,
        scale: scale
    })
}

export type Actions = ReturnType<typeof actions[keyof typeof actions]>
