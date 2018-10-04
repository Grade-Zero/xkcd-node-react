import axios from 'axios'
import { config } from '../config';

export const generateApiUrl = (url: string) => {
    return url
}

export async function loadRandomComics() {
    let comics = await axios.get(generateApiUrl('/v1/xkcd/comics'), config.api.defaultConf)
    return comics
}

export async function loadWalls(userId: number) {
    let walls = await axios.get(generateApiUrl(`/v1/wall/list/by_userid/${userId}`), config.api.defaultConf)
    return walls
}

export async function loadBins(userId: number) {
    let bins = await axios.get(generateApiUrl(`/v1/bin/list/by_userid/${userId}`), config.api.defaultConf)
    return bins
}
