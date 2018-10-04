import { Route, Get, Post, Tags, Body, Query, Security, Request } from 'tsoa';
import { StandardResponse } from '../models/standard';
import { WineNoIdDb, WineDb, WineMove } from '../models/wine';
import * as express from 'express'
import { getAllWine, getWineByBin, addBottles, deleteBottles, getWineByUserId, moveBottles, archiveBottles } from '../services/wine';

@Route('wine')
export class WineController {

    @Get('wine')
    @Tags('Authenticated')
    @Security('cellar_session')
    public async Wine(
        @Query() limit?: number,
    ): Promise<StandardResponse<WineDb[]>> {
        let data = await getAllWine()
        return {data, meta: {}};
    }

    @Get('wine_by_bin')
    @Tags('Authenticated')
    @Security('cellar_session')
    public async WineByBin(
        @Query() binId: number,
    ): Promise<StandardResponse<WineDb[]>> {
        let data = await getWineByBin(binId)
        return {data, meta: {}};
    }

    @Post('wines')
    @Tags('Authenticated')
    @Security('cellar_session')
    public async DataArray(
        @Body() formData: WineNoIdDb[],
    ): Promise<StandardResponse<WineDb[]>> {
        let res = await addBottles(formData)
        let binId = formData[0].bin_id
        let bottles = await getWineByBin(binId)
        return {data: bottles, meta: {}};
    }

    @Get('list/by_userid/{userId}')
    @Tags('Authenticated')
    @Security('cellar_session')
    public async List(
        @Request() request: express.Request,
        userId: number
    ): Promise<StandardResponse<WineDb[]>> {
        let data = await getWineByUserId(userId)
        return {data, meta: {}};
    }

    @Post('delete')
    @Tags('Authenticated')
    @Security('cellar_session')
    public async DeleteWine(
        @Body() bottlesToDelete: WineDb[],
    ): Promise<StandardResponse<ChangeStatusResponse>> {
        let data = await deleteBottles(bottlesToDelete)
        return {data: {success: true}, meta: {}}
    }

    @Post('update')
    @Tags('Authenticated')
    @Security('cellar_session')
    public async UpdateWine(
        @Request() request: express.Request,
        @Body() body: WineMove,
    ): Promise<StandardResponse<WineDb[]>> {
        let moved = await moveBottles(body)
        let bottles = await getWineByUserId(request.user.id)
        return {data: bottles, meta: {}}
    }

    @Post('archive')
    @Tags('Authenticated')
    @Security('cellar_session')
    public async ArchiveWine(
        @Request() request: express.Request,
        @Body() body: WineDb[],
    ): Promise<StandardResponse<WineDb[]>> {
        let archived = await archiveBottles(body)
        let bottles = await getWineByUserId(request.user.id)
        return {data: bottles, meta: {}}
    }
}

export interface ChangeStatusResponse {
    success: boolean
}
