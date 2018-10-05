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

const mapStateToProps = (state: RootState) => ({
    // user: state.user.active,
    // company: state.company.active
    comics: state.comic.comics
})

const mapDispatchToProps = (dispatch: Dispatch, ownProps: {item: WineModel}) => ({
    load: async () => {
        let comicPayload = await axios.get(generateApiUrl('/v1/xkcd/comics'), config.api.defaultConf)
        dispatch(comicActions.setComics(comicPayload.data.data))
        // let userPayload = await axios.get(generateApiUrl('/v1/user/active/'), config.api.defaultConf)
        // let user = userPayload.data.data
        // dispatch(userActions.setActiveUser(user))
        // let companyPayload = await axios.get(generateApiUrl(`/v1/company/${user.company_id}/`), config.api.defaultConf)
        // dispatch(companyActions.setActiveCompany(companyPayload.data.data))
    }
})

export type ComponentProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)

