import { Route, Get, Post, Tags, Body, Query, Request, Security } from 'tsoa';
import { StandardResponse } from '../models/standard';
import * as express from 'express'
import { getAllWalls, getWallsByCellarId, getWallsByUserId } from '../services/wall';
import { Wall } from '../models/wall';
import { NotAuthorized } from '../utils/custom_error';


@Route('wall')
export class WallController {

    @Get('walls')
    @Tags('Open')
    public async Walls(
        @Query() limit?: number,
    ): Promise<StandardResponse<Wall[]>> {
        let data = await getAllWalls()
        return {data, meta: {}};
    }

    @Get('list/by_cellarid/{cellarId}')
    @Tags('Authenticated')
    @Security('cellar_session')
    public async ByCellar(
        @Request() request: express.Request,
        cellarId: number
    ): Promise<StandardResponse<Wall[]>> {
        let data = await getWallsByCellarId(cellarId)
        return {data, meta: {}};
    }

    @Get('list/by_userid/{userId}')
    @Tags('Authenticated')
    @Security('cellar_session')
    public async ByUser(
        @Request() request: express.Request,
        userId: number
    ): Promise<StandardResponse<Wall[]>> {
        let data = await getWallsByUserId(userId)
        return {data, meta: {}};
    }
}
