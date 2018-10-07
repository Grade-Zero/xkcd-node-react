import { connect } from 'react-redux'
import { App } from './App'
import { RootState } from '../../store';
import { Dispatch } from 'redux';
import { actions as userActions } from '../../store/user/action'
import { actions as companyActions } from '../../store/company/action'
import { actions as comicActions } from '../../store/comic/action'
import axios from 'axios';

import { WineDb as WineModel } from '../../../../api/models/wine'
import { generateApiUrl } from '../../services/api';
import { config } from '../../config';
import { Comic } from '../../../../api/models/xkcd';

const mapStateToProps = (state: RootState) => ({
    // user: state.user.active,
    // company: state.company.active
    comics: state.comic.comics
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
    load: async () => {
        let fetchPayload = await axios.get(generateApiUrl('/v1/xkcd/comics'), config.api.defaultConf)
        console.log(fetchPayload)
        await axios.post(generateApiUrl(`/v1/xkcd/comic`), fetchPayload.data.data[0], config.api.defaultConf)
        // Can't connect to db due to no docker
        // let [comicPayload] = await Promise.all([
        //     axios.get(generateApiUrl('/v1/xkcd/dbComics'), config.api.defaultConf)
        // ])
        // let comics = comicPayload.data.data

        // dispatch(comicActions.setComics(comicPayload.data.data))
        dispatch(comicActions.setComics(fetchPayload.data.data))
        // let userPayload = await axios.get(generateApiUrl('/v1/user/active/'), config.api.defaultConf)
        // let user = userPayload.data.data
        // dispatch(userActions.setActiveUser(user))
        // let companyPayload = await axios.get(generateApiUrl(`/v1/company/${user.company_id}/`), config.api.defaultConf)
        // dispatch(companyActions.setActiveCompany(companyPayload.data.data))
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

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)

