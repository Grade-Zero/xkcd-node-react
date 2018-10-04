import * as _ from 'lodash'
import { connect } from 'react-redux'

import { WineSection } from './WineSection'
import { RootState } from '../../store';
import { Dispatch } from 'redux';
import { actions as uiActions } from '../../store/ui/action'
import { actions as cellarActions } from '../../store/cellar/action'
import { WineDb as WineModel, WineDb } from '../../../../src/models/wine'

const mapStateToProps = (state: RootState) => ( {
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
    changeWineFormActive: (active: boolean) => {
        dispatch(uiActions.changeWineFormActive(active))
    },
    setEditMode: (value: boolean) => {
        dispatch(uiActions.setEditMode(value))
    },
    setMoveBottles: (bottles: WineDb[] | null) => {
        dispatch(cellarActions.setBottlesToMove(bottles))
    }
})

export type ComponentProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(WineSection)
