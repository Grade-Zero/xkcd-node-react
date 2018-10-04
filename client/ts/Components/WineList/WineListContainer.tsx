import * as _ from 'lodash'
import { connect } from 'react-redux'

import { WineList } from './WineList'
import { RootState } from '../../store';
import { Dispatch } from 'redux';
import { actions } from '../../store/cellar/action';
import { actions as uiActions } from '../../store/ui/action'
import { WineDb as WineModel } from '../../../../src/models/wine'
import { ModalType } from '../../store/ui/models';
import { Modal } from '../../store/ui/reducer'

const mapStateToProps = (state: RootState) => ( {
    walls: state.cellar.walls,
    activeBottle: state.cellar.bottle,
    modal: state.ui.modal,
    filter: state.ui.filter
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
    changeActiveWine: (bottle: WineModel) => {
        dispatch(actions.changeActiveBottle(bottle.id))
    },
    changeSelectedWine: (bottle: WineModel) => {
        dispatch(actions.changeSelectedBottle(bottle))
    },
    view: (modalType: ModalType, modal: Modal) => {
        dispatch(uiActions.openModal(modalType, modal.meta))
    },
})

export type ComponentProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(WineList)

