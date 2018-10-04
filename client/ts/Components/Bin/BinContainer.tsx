import { connect } from 'react-redux'
import { Bin } from './Bin'
import { RootState } from '../../store';
import { Dispatch } from 'redux';
import { actions as cellarActions } from '../../store/cellar/action';
import { actions as uiActions } from '../../store/ui/action'
import { Bin as BinModel, BinDb } from '../../../../src/models/bin'
import { Wall as WallModel } from '../../../../src/models/wall'
import { WineDb as WineModel, WineNoIdDb, WineDb, WineMove } from '../../../../src/models/wine'
import { Modal } from '../../store/ui/reducer'
import { ModalType, FilterModel } from '../../store/ui/models'
import axios from 'axios';
import { generateApiUrl, loadWalls, loadBins } from '../../services/api';
import { config } from '../../config';
import { SelectedBin, TempBottle } from '../../store/cellar/reducer';

const mapStateToProps = (state: RootState, ownProps: {bin: BinModel, wall: WallModel}) => ( {
    user: state.user.active,
    binScale: state.ui.binScale.scale,
    tempBottles: state.cellar.tempBottles,
    bin: ownProps.bin,
    search: state.ui.search,
    wall: ownProps.wall,
    wallFilter: state.ui.wallFilter,
    binFilter: state.ui.binFilter,
    filter: state.ui.filter,
    activeBottle: state.cellar.bottle,
    modal: state.ui.modal,
    addWineFormActive: state.ui.form.active,
    addQuantity: state.ui.form.quantity,
    selectedBins: state.cellar.selectedBins,
    formData: state.ui.formData.fields,
    edit: state.ui.edit.edit,
    editBottles: state.cellar.moveBottles.bottles,
    move: state.ui.move.move
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
    changeActiveWine: (bottle: WineModel) => {
        dispatch(cellarActions.changeActiveBottle(bottle.id))
    },
    changeSelectedWine: (bottle: WineModel) => {
        dispatch(cellarActions.changeSelectedBottle(bottle))
    },
    changeSelectedBin: (bins: SelectedBin[]) => {
        dispatch(cellarActions.changeSelectedBins(bins))
    },
    view: (modalType: ModalType, modal: Modal) => {
        dispatch(uiActions.openModal(modalType, modal.meta))
    },
    setTempBottles: (bottles: TempBottle[]) => {
        dispatch(cellarActions.setNewBottles(bottles))
    },
    setMoveBottles: (bottles: WineDb[] | null) => {
        dispatch(cellarActions.setBottlesToMove(bottles))
    },
    moveBottles: async (userId: number, data: WineMove) => {
        await axios.post(generateApiUrl('/v1/wine/update'), data, config.api.defaultConf)
        let [winePayload, bins, walls] = await Promise.all([
            await axios.get(generateApiUrl(`/v1/wine/list/by_userid/${userId}`), config.api.defaultConf),
            await loadBins(userId),
            await loadWalls(userId)
        ])
        dispatch(cellarActions.setBins(bins.data.data))
        dispatch(cellarActions.setWalls(walls.data.data))
        dispatch(cellarActions.setBottles(winePayload.data.data))
    },
    editBin: async (userId: number, bin: BinDb) => {
        let edit = await axios.post(generateApiUrl('/v1/bin/update'), bin, config.api.defaultConf)
        let walls = await loadWalls(userId)
        dispatch(cellarActions.setWalls(walls.data.data))
        console.log(edit)
    },
    setMoveMode: (value: boolean) => {
        dispatch(uiActions.setMoveMode(value))
        dispatch(cellarActions.setBottlesToMove([]))
    }
})

export type ComponentProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Bin)

