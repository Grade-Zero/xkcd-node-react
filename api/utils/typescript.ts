
export function getEnumValues(tsEnum: any): string[] {
    return Object.keys(tsEnum).map(key => tsEnum[key]);
}

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
