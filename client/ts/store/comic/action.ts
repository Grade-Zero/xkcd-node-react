import { ComicDb } from '../../../../api/models/xkcd'
export enum ComicActionTypes {
    SET_FETCHED_COMIC = 'SET_FETCHED_COMIC'
}
export const actions = {
    setComics: (comics: ComicDb[]) => ({
        type: ComicActionTypes.SET_FETCHED_COMIC as ComicActionTypes.SET_FETCHED_COMIC,
        comics: comics
    }),
}

export type Actions = ReturnType<typeof actions[keyof typeof actions]>
