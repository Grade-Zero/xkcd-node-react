import { Bin } from './bin'

export interface Wall {
    id: number,
    company_id: number,
    cellar_id: number,
    name: string,
    coorindate_x: string,
    coordinate_y: string,
    bins: Bin[],
    active: boolean
}
