import { Route, Get, Post, Tags, Body, Query, Request, Security } from 'tsoa';
import { StandardResponse } from '../models/standard';
import * as express from 'express'
import { AuditDb, AuditNoIdDb } from '../models/audit';
import { insertAudit, insertAuditBatch } from '../services/audit';


@Route('audit')
export class AuditController {

    @Post('audit')
    @Tags('Authenticated')
    @Security('cellar_session')
    public async PostAudit(
        @Request() request: express.Request,
        @Body() body: AuditNoIdDb[],
    ): Promise<StandardResponse<boolean>> {
        let audit = await insertAuditBatch(body)
        return {data: true, meta: {}}
    }
}
