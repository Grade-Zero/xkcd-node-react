export interface TableControl {
    name: Boolean,
    vineyard: Boolean,
    color: Boolean,
    type: Boolean,
    cellarUntil: Boolean,
    expiry: Boolean,
    rating: Boolean,
    purchaseCost: Boolean,
    retailValue: Boolean
}

export interface WineModel  {
    id: number,
    company_id: number,
    bin_id: number,
    sku: string,
    name: string,
    vineyard: string,
    color: string,
    year: number,
    country?: string,
    type: string,
    cellar_until: string,
    expiry: string,
    rating?: number,
    purchase_cost?: number,
    retail_value?: number,
    coordinate: string,
    coordinate_x: string,
    coordinate_y: string,
    added_on?: Date | string,
    archived?: boolean | number,
}

export interface FilterModel {
    name: string,
    value: string | null,
    values: Array<any>,
    update: Function
}

export enum ModalType {
    bottle = 'item'
}
