import { connect } from 'react-redux'
import * as _ from 'lodash'
import { Home } from './Home'
import { RootState } from '../../store';
import { Dispatch } from 'redux';
import axios from 'axios';
import { withRouter } from 'react-router-dom'
import { actions as comicActions } from '../../store/comic/action'
import { ComicDb } from '../../../../api/models/xkcd';
import { generateApiUrl } from '../../services/api';
import { config } from '../../config';

const mapStateToProps = (state: RootState) => ({
    comics: null || state.comic.comics
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
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
        for (let i = 0; i < 9; i++) {
            let fetchPayload = await axios.get(generateApiUrl('/v1/xkcd/comics'), config.api.defaultConf)
            await axios.post(generateApiUrl(`/v1/xkcd/comic`), fetchPayload.data.data[0], config.api.defaultConf)
        }
        let [comicPayload] = await Promise.all([
            axios.get(generateApiUrl('/v1/xkcd/fetch'), config.api.defaultConf)
        ])
        let fetched = comicPayload.data.data
        let reversed = _.reverse(fetched)
        let slice = reversed.slice(0, 9)
        dispatch(comicActions.setComics(slice))
    },
})

export type ComponentProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home)

