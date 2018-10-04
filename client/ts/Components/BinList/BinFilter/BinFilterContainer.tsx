import * as _ from 'lodash'
import { connect } from 'react-redux'

import { BinFilter } from './BinFilter'
import { RootState } from '../../../store';
import { Dispatch } from 'redux';
import { actions } from '../../../store/cellar/action';
import { actions as uiActions } from '../../../store/ui/action'

const mapStateToProps = (state: RootState) => ( {
    walls: state.cellar.walls,
    binTypes: state.cellar.binTypes,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
    updateBottleSearch: (term: string | null) => {
        dispatch(uiActions.changeSearchTerm(term || ''))
    },
    updateBinCapacityFilter: (space: string | null) => {
        dispatch(uiActions.changeBinCapacityFilter(space))
    },
    updateBinTypeFilter: (type: string | null) => {
        dispatch(uiActions.changeBinTypeFilter(type))
    },
    updateWallFilter: (wall: string | null) => {
        dispatch(uiActions.changeWallFilter(wall))
    }
})

export type ComponentProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BinFilter)

