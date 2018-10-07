let xkcd = require('xkcd-api')
import {XKCD} from '@ffflorian/xkcdjs'
import { Comic, XkcdResponse, ComicDb } from '../models/xkcd'
import { insertComicDb, fetchComicsDb } from '../db/xkcd'

export async function getRandomComic(): Promise<Comic[]> {
    // return await xkcd.random(async function(error: any, response: XkcdResponse) {
    //     if (error) {
    //         console.error('error', error);
    //         let bad: Comic = await {
    //             title: 'N/A',
    //             url: 'http://xkcd.com'
    //         }
    //         console.log(bad)
    //         return bad
    //         // return error
    //     } else {
    //         console.log('success', response);
    //         // return response
    //         let good: Comic = await {
    //             title: response.safe_title,
    //             url: response.img
    //         }
    //         console.log(good)
    //         return good
    //     }
    // })
    // let comic = await xkcd.random(function(error: any, response: XkcdResponse) {
    //     if (error) {
    //         console.error('error', error);
    //         let bad: Comic = {
    //             title: 'N/A',
    //             url: 'http://xkcd.com'
    //         }
    //         console.log(bad)
    //         return bad
    //     } else {
    //         console.log('success', response);
    //         // return response
    //         let good: Comic = {
    //             title: response.safe_title,
    //             url: response.img
    //         }
    //         console.log(good)
    //         return good
    //     }
    // })

    // let comic = await fetchComic()

    // return comic
    const xkcdThing = new XKCD()

    let comic = await xkcdThing.getRandom({withData: true}).then((result: any) => {
        console.log(result)
        let res: Comic = {
            title: result.safe_title,
            url: result.img
        }

        return res
    })

    let array: Comic[] = []
    array.push(comic)
    // return [comic]
    return array
    // return true
}

async function fetchComic(): Promise<Comic> {
    return await xkcd.random((error: any, response: XkcdResponse) => {
        if (error) {
            console.error('error', error);
            let bad: Comic = {
                title: 'N/A',
                url: 'http://xkcd.com'
            }
            console.log(bad)
            return bad
        } else {
            console.log('success', response);
            // return response
            let good: Comic = {
                title: response.safe_title,
                url: response.img
            }
            console.log(good)
            return good
        }
    })
}

export async function getRandomComicTs(): Promise<boolean> {
    return xkcd.random((error: any, response: any) => {
        if (error) {
            console.error(error);
            // return error
        } else {
            console.log(response);
            // return response
        }
        return true
    })
}

export async function fetchComics(limit?: number): Promise<ComicDb[]> {
    return fetchComicsDb(null, limit);
}

export async function insertComic(comic: Comic): Promise<undefined> {
    // let archivedBottles = _.map(bottles, (bottle: WineDb) => {
    //     return {...bottle, archived: 1}
    // })
    insertComicDb(null, comic)
    // let ids: number[] = archivedBottles.map((bottle) => bottle.id)
    // archiveBottlesDb(null, ids)
    return undefined
}

