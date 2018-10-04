export interface WineDb extends WineNoIdDb {
    id: number,
}

export interface WineNoIdDb {
    company_id: number,
    bin_id: number,
    sku: string,
    name: string,
    vineyard: string,
    color: string,
    year?: number | null,
    country?: string | null,
    type: string,
    cellar_until: string,
    expiry: string,
    rating?: number | null,
    purchase_cost?: number | null,
    retail_value?: number | null,
    coordinate: string,
    coordinate_x: string,
    coordinate_y: string,
    added_on?: Date | string | null,
    archived?: boolean | number,
}

export interface WineAdd {
    company_id: number,
    bin_id: number,
    sku: string,
    name: string,
    vineyard: string,
    color: string,
    year?: number | null,
    country?: string | null,
    type: string,
    cellar_until: string,
    expiry: string,
    rating?: number | null,
    purchase_cost?: number | null,
    retail_value?: number | null,
}

export interface WineMove {
    insert: WineNoIdDb[],
    remove: WineDb[]
}
