// For some reason TSOA only supports one generic param
export interface StandardResponse<T> {
    data: T,
    meta: any,
}

export interface InsertId {
    'LAST_INSERT_ID()': number
}

export interface OptionalId {
    id: number | null | undefined
}
