export enum SessionType {
    general = 'general'
}

export interface SessionDb {
    id: string,
    type: SessionType,
    expiry: Date,
    user_id: number,
    deactivated: boolean,
    created_at: Date
}
