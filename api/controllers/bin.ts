import { Route, Get, Post, Tags, Body, Query, Security, Request } from 'tsoa';
import { StandardResponse } from '../models/standard';
import { Bin, BinType, BinDb } from '../models/bin';
import * as express from 'express'
import { getAllBins, getBinTypes, getBinsByUserId, getBinById, updateBin } from '../services/bin';
import { NotAuthorized } from '../utils/custom_error';


@Route('bin')
export class BinController {

    @Get('bins')
    @Tags('Open')
    public async Bins(
        @Query() limit?: number,
    ): Promise<StandardResponse<Bin[]>> {
        let data = await getAllBins()
        return {data, meta: {}};
    }

    @Get('bin_types')
    @Tags('Open')
    public async BinTypes(
        @Query() limit?: number,
    ): Promise<StandardResponse<BinType[]>> {
        let data = await getBinTypes()
        return {data, meta: {}};
    }

    @Get('list/by_userid/{userId}')
    @Tags('Authenticated')
    @Security('cellar_session')
    public async List(
        @Request() request: express.Request,
        userId: number
    ): Promise<StandardResponse<Bin[]>> {
        if (request.user.id !== userId) {
            throw new NotAuthorized()
        }
        let data = await getBinsByUserId(userId)
        return {data, meta: {}};
    }

    @Post('update')
    @Tags('Authenticated')
    @Security('cellar_session')
    public async Update(
        @Request() request: express.Request,
        @Body() body: BinDb,
    ): Promise<StandardResponse<BinDb>> {
        let archived = await updateBin(body)
        let bin = await getBinById(body.id)
        return {data: bin, meta: {}}
    }
}

