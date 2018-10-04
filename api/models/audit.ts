export interface AuditDb extends AuditNoIdDb {

}

export interface AuditNoIdDb {
    company_id: number,
    action: AuditAction,
    payload: string
}

export enum AuditAction {
    archive = 'archive',
    move = 'move'
}

