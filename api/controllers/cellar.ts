import { Route, Get, Post, Tags, Body, Query, Request, Security } from 'tsoa';
import { StandardResponse } from '../models/standard';
import * as express from 'express'
import { getAllWalls } from '../services/wall';
import { Wall } from '../models/wall';
import { NotAuthorized } from '../utils/custom_error';
import { getCellarByUserId } from '../services/cellar';
import { CellarDb } from '../models/cellar';


@Route('cellar')
export class CellarController {

    @Get('cellar/by_userid/{userId}')
    @Tags('Authenticated')
    @Security('cellar_session')
    public async List(
        @Request() request: express.Request,
        userId: number
    ): Promise<StandardResponse<CellarDb[]>> {
        if (request.user.id !== userId) {
            throw new NotAuthorized()
        }
        let data = await getCellarByUserId(userId)
        return {data, meta: {}};
    }
}
