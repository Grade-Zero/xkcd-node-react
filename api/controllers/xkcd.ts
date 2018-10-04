import { Comic } from '../models/xkcd'
import { StandardResponse } from '../models/standard'
import { Route, Get, Tags, Query } from 'tsoa'
import { getRandomComic } from '../services/xkcd';


@Route('xkcd')
export class XKCDController {

    @Get('comics')
    @Tags('Open')
    public async Walls(
        @Query() limit?: number,
    ): Promise<StandardResponse<boolean>> {
        let data = await getRandomComic()
        return {data, meta: {}};
    }
}
