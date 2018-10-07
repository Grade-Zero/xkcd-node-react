import * as express from 'express'
import { Comic, ComicDb } from '../models/xkcd'
import { StandardResponse } from '../models/standard'
import { Route, Get, Tags, Query, Post, Request, Body } from 'tsoa'
import { getRandomComic, insertComic, fetchComics, fetchAllComics } from '../services/xkcd';


@Route('xkcd')
export class XKCDController {

    @Get('comics')
    @Tags('Open')
    public async Walls(
        @Query() limit?: number,
    ): Promise<StandardResponse<Comic[]>> {
        let data = await getRandomComic()
        console.log('controller data', data)
        return {data, meta: {}};
    }

    @Get('dbComics')
    @Tags('Open')
    public async Comics(
        @Query() limit?: number,
    ): Promise<StandardResponse<ComicDb[]>> {
        let data = await fetchComics(9)
        console.log('controller fetch data', data)
        return {data, meta: {}};
    }

    @Get('fetch')
    @Tags('Open')
    public async FetchComics(): Promise<StandardResponse<ComicDb[]>> {
        let data = await fetchAllComics()
        return {data, meta: {}};
    }

    @Post('comic')
    @Tags('Open')
    public async InsertComic(
        @Request() request: express.Request,
        @Body() body: Comic,
    ): Promise<StandardResponse<boolean>> {
        let inserted = await insertComic(body)
        let val = true
        return {data: val, meta: {}}
    }
}
