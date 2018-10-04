import * as _ from 'lodash'
import { connect } from 'react-redux'

import { BottleFilter } from './BottleFilter'
import { RootState } from '../../../store';
import { Dispatch } from 'redux';
import { actions } from '../../../store/cellar/action';
import { actions as uiActions } from '../../../store/ui/action'

const mapStateToProps = (state: RootState) => ( {
    bottles: state.cellar.bottles
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
    updateVineyardFilter: (id: string | null) => {
        dispatch(uiActions.changeVineyardFilter(id))
    },
    updateColorFilter: (id: string | null) => {
        dispatch(uiActions.changeColorFilter(id))
    },
    updateYearFilter: (id: number | null) => {
        dispatch(uiActions.changeYearFilter(id))
    },
    updateCountryFilter: (id: string | null) => {
        dispatch(uiActions.changeCountryFilter(id))
    },
    updateTypeFilter: (id: string | null) => {
        dispatch(uiActions.changeTypeFilter(id))
    },
    updateCellarUntilFilter: (id: string | null) => {
        dispatch(uiActions.changeCellarUntilFilter(id))
    },
    updateExpiryFilter: (id: string | null) => {
        dispatch(uiActions.changeExpiryFilter(id))
    },
    updateRatingFilter: (id: string | null) => {
        dispatch(uiActions.changeRatingFilter(id))
    },
    updateNameFilter: (id: string | null) => {
        dispatch(uiActions.changeNameFilter(id))
    }
})

export type ComponentProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BottleFilter)

