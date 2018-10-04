import { connect } from 'react-redux'
import { BinList } from './BinList'
import { RootState } from '../../store';
import { Dispatch } from 'redux';
import { actions as cellarActions } from '../../store/cellar/action';
import { actions as uiActions } from '../../store/ui/action'
import { Modal } from '../../store/ui/reducer'
import { ModalType } from '../../store/ui/models'
import { WineDb as WineModel, WineDb } from '../../../../src/models/wine'
import { AuditNoIdDb, AuditAction } from '../../../../src/models/audit'
import axios from 'axios';
import { generateApiUrl, loadWalls } from '../../services/api';
import { config } from '../../config';
import { UserApi } from '../../../../src/models/user';

const mapStateToProps = (state: RootState) => ( {
    user: state.user.active,
    binScale: state.ui.binScale.scale,
    walls: state.cellar.walls,
    edit: state.ui.edit.edit,
    editBottles: state.cellar.moveBottles.bottles,
    move: state.ui.move.move,
    wineFormActive: state.ui.form.active
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
    setEditMode: (value: boolean) => {
        dispatch(uiActions.setEditMode(value))
    },
    setMoveBottles: (bottles: WineDb[] | null) => {
        dispatch(cellarActions.setBottlesToMove(bottles))
    },
    setMoveMode: (value: boolean) => {
        dispatch(uiActions.setMoveMode(value))
    },
    changeBinScale: (scale: number) => {
        dispatch(uiActions.changeBinScale(scale))
    },
    removeBottles: async (user: UserApi, bottles: WineDb[] | null) => {
        let archived = await axios.post(generateApiUrl('/v1/wine/archive'), bottles, config.api.defaultConf)
        let auditString = JSON.stringify(bottles)
        let audit: AuditNoIdDb = {
            company_id: user.company_id,
            action: AuditAction.archive,
            payload: auditString
        }
        let auditPayload = await axios.post(generateApiUrl('/v1/audit/audit'), audit, config.api.defaultConf)
        let [winePayload, walls] = await Promise.all([
            await axios.get(generateApiUrl(`/v1/wine/list/by_userid/${user.id}`), config.api.defaultConf),
            await loadWalls(user.id)
        ])
        await dispatch(cellarActions.setWalls(walls.data.data))
        await dispatch(cellarActions.setBottles(winePayload.data.data))
    }
})

export type ComponentProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BinList)

