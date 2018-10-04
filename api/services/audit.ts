import * as _ from 'lodash'
import { AuditDb, AuditNoIdDb } from '../models/audit'
import { insertAuditDb, insertAuditBatchDb } from '../db/audit';

export async function insertAudit(formData: AuditNoIdDb): Promise<boolean> {
    let id = await insertAuditDb(null, formData)
    return true
}

export async function insertAuditBatch(formData: AuditNoIdDb[]): Promise<boolean> {
    let batches: any[] = _.map(formData, (audit: AuditNoIdDb) => {
        return [audit.company_id, audit.action, audit.payload]
    })
    let id = await insertAuditBatchDb(null, batches)
    return true
}
