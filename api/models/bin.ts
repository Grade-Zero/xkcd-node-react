import { WineDb } from './wine'

export interface Bin {
    id: number,
    company_id: number,
    wall_id: number,
    name: string,
    type: number,
    bin_type: BinType | undefined,
    coordinate_x: string,
    coordinate_y: string,
    bottles: WineDb[],
    available_positions: Array<BottlePosition>,
    taken_positions: Array<BottlePosition>,
    active: boolean
}

export interface BinDb {
    id: number,
    company_id: number,
    wall_id: number,
    name: string,
    type: number,
    bin_type: BinType | undefined,
    coordinate_x: string,
    coordinate_y: string,
    bottles: WineDb[]
}

export interface BinType {
    id: number,
    type_name: string,
    capacity: number
}

export interface BinTypeDefault {
    id: number,
    type_id: number,
    coordinates_x: string,
    coordinates_y: string
}

export interface BottlePosition {
    coordinate_x: string,
    coordinate_y: string,
    available: boolean
}

export interface BinBottlePosition {
    coordinate_x: string,
    coordinate_y: string,
    available: boolean,
    bottle: WineDb | null,
    temp: boolean
}
