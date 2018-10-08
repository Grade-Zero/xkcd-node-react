import * as _ from 'lodash'
import { connect } from 'react-redux'
import { App } from './App'
import { RootState } from '../../store';
import { Dispatch } from 'redux';
import { withRouter } from 'react-router-dom'
import { actions as comicActions } from '../../store/comic/action'
import axios from 'axios';
import { generateApiUrl } from '../../services/api';
import { config } from '../../config';
import { Comic, ComicDb } from '../../../../api/models/xkcd';

const mapStateToProps = (state: RootState) => ({
    comics: state.comic.comics
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
    load: async () => {
        let fetchPayload = await axios.get(generateApiUrl('/v1/xkcd/comics'), config.api.defaultConf)
        await axios.post(generateApiUrl(`/v1/xkcd/comic`), fetchPayload.data.data[0], config.api.defaultConf)
        // let [comicPayload] = await Promise.all([
        //     axios.get(generateApiUrl('/v1/xkcd/dbComics'), config.api.defaultConf)
        // ])
        // let comics = comicPayload.data.data

        let loadPayload = await axios.get(generateApiUrl('/v1/xkcd/fetch'), config.api.defaultConf)
        let all = _.shuffle(loadPayload.data.data)
        let comics: ComicDb[] = []
        _.each(all, (comic: ComicDb) => {
            if (comics.length < 9) {
                comics.push(comic)
            }
        })
        dispatch(comicActions.setComics(comics))

        // dispatch(comicActions.setComics(comicPayload.data.data))
    },
    reload: async (current: ComicDb[]) => {
        let fetchPayload = await axios.get(generateApiUrl('/v1/xkcd/fetch'), config.api.defaultConf)
        let all = _.shuffle(fetchPayload.data.data)
        let comics: ComicDb[] = []
        _.each(all, (comic: ComicDb) => {
            if (!_.find(current, {id: comic.id})) {
                if (comics.length < 9) {
                    comics.push(comic)
                }
            }
        })
        dispatch(comicActions.setComics(comics))
    },
    loadBatch: async () => {
        for (let i = 0; i < 10; i++) {
            let fetchPayload = await axios.get(generateApiUrl('/v1/xkcd/comics'), config.api.defaultConf)
            await axios.post(generateApiUrl(`/v1/xkcd/comic`), fetchPayload.data.data[0], config.api.defaultConf)
        }
        let [comicPayload] = await Promise.all([
            // axios.get(generateApiUrl('/v1/xkcd/dbComics'), config.api.defaultConf)
            axios.get(generateApiUrl('/v1/xkcd/fetch'), config.api.defaultConf)
        ])
        let fetched = comicPayload.data.data
        let reversed = _.reverse(fetched)
        let slice = reversed.slice(0, 9)
        // dispatch(comicActions.setComics(comicPayload.data.data))
        dispatch(comicActions.setComics(slice))
    },
    insertFetchedComic: async (fields: Comic) => {
        await axios.post(generateApiUrl(`/v1/xkcd/comic`), fields, config.api.defaultConf)
        let [comicPayload] = await Promise.all([
            axios.get(generateApiUrl('/v1/xkcd/dbComics'), config.api.defaultConf)
        ])
        let comics = comicPayload.data.data
        dispatch(comicActions.setComics(comicPayload.data.data))
    },
    loadTest: async () => {
        let comicFetch = await axios.get('https://crossorigin.me/http://xkcd.com/info.0.json')
        console.log(comicFetch)
    }
})

export type ComponentProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>

const connectedComponent = connect(mapStateToProps, mapDispatchToProps)(App)
export default (withRouter as any)(connectedComponent)

// export default connect(
//     mapStateToProps,
//     mapDispatchToProps
// )(App)

