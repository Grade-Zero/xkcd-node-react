import axios from 'axios'
import { config } from '../config';

export const generateApiUrl = (url: string) => {
    return url
}

export async function loadRandomComics() {
    let comics = await axios.get(generateApiUrl('/v1/xkcd/comics'), config.api.defaultConf)
    return comics
}
