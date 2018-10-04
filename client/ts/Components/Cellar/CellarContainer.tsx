import { connect } from 'react-redux'
import { Cellar } from './Cellar'
import { RootState } from '../../store';
import { Dispatch } from 'redux';
import { actions } from '../../store/cellar/action';
import axios from 'axios';

import { loadWalls, loadBins } from '../../services/api'
import { generateApiUrl } from '../../services/api';
import { config } from '../../config';

const mapStateToProps = (state: RootState) => ({
    user: state.user.active,
    company: state.company.active
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
    loadData: async (userId: number) => {
        let cellar = await axios.get(generateApiUrl(`/v1/cellar/cellar/by_userid/${userId}`), config.api.defaultConf)
        dispatch(actions.setCellar(cellar.data.data))
        let items = await axios.get(generateApiUrl(`/v1/wine/list/by_userid/${userId}`), config.api.defaultConf)
        dispatch(actions.setBottles(items.data.data))
        let bins = await loadBins(userId)
        dispatch(actions.setBins(bins.data.data))
        let walls = await loadWalls(userId)
        dispatch(actions.setWalls(walls.data.data))
        let bintypes = await axios.get(generateApiUrl(`/v1/bin/bin_types`), config.api.defaultConf)
        dispatch(actions.setBinTypes(bintypes.data.data))
        dispatch(actions.setBottlesToMove([]))
    },
    loadWalls: async () => {
        let walls = await axios.get('/v1/wall/walls')
        dispatch(actions.setWalls(walls.data.data))
    }
})

export type ComponentProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Cellar)

