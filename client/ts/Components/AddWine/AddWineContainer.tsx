import * as _ from 'lodash'
import { connect } from 'react-redux'
import { AddWine } from './AddWine'
import { RootState } from '../../store';
import { Dispatch } from 'redux';
import { actions as cellarActions } from '../../store/cellar/action';
import { actions as uiActions } from '../../store/ui/action'
import { Bin as BinModel } from '../../../../src/models/bin'
import axios from 'axios';

import { WineDb as WineModel, WineNoIdDb, WineAdd } from '../../../../src/models/wine'
import { generateApiUrl, loadWalls, loadBins } from '../../services/api';
import { config } from '../../config';
import { SelectedBin } from '../../store/cellar/reducer';

const mapStateToProps = (state: RootState, ownProps: {cancel: Function}) => ( {
    user: state.user.active,
    selectedBins: state.cellar.selectedBins,
    tempBottles: state.cellar.tempBottles,
    bins: state.cellar.bins,
    bottles: state.cellar.bottles,
    uniqBottles: _.uniqBy(state.cellar.bottles, (bottle) => bottle.sku.toLowerCase() + ':' + bottle.name.toLowerCase),
    cancel: ownProps.cancel
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
    addWineFormActive: (active: boolean) => {
        dispatch(uiActions.changeWineFormActive(active))
    },
    updateWineInput: (fields: any) => {
        let temp: WineNoIdDb = {
            company_id: fields.company_id,
            bin_id: fields.bin_id,
            sku: fields.sku,
            name: fields.name,
            vineyard: fields.vineyard,
            color: fields.color,
            year: fields.year,
            country: fields.country,
            type: fields.type,
            cellar_until: fields.cellar_until,
            expiry: fields.expiry,
            rating: fields.rating,
            purchase_cost: fields.purchase_cost,
            retail_value: fields.retail_value,
            coordinate: '',
            coordinate_x: '',
            coordinate_y: '',
            archived: false
        }
        dispatch(uiActions.updateWineInput(temp))
    },
    changeSelectedBins: (bin: SelectedBin[]) => {
        dispatch(cellarActions.changeSelectedBins(bin))
    },
    changeSelectedBinsIndex: (index: number) => {
        dispatch(cellarActions.changeSelectedBinsIndex(index))
    },
    submitMany: async (userId: number, bottles: WineNoIdDb[]) => {
        await axios.post(generateApiUrl('/v1/wine/wines'), bottles, config.api.defaultConf)
        let [winePayload, bins, walls] = await Promise.all([
            await axios.get(generateApiUrl(`/v1/wine/list/by_userid/${userId}`), config.api.defaultConf),
            await loadBins(userId),
            await loadWalls(userId)
        ])
        dispatch(cellarActions.setBins(bins.data.data))
        dispatch(cellarActions.setWalls(walls.data.data))
        dispatch(cellarActions.setBottles(winePayload.data.data))
    }
})

export type ComponentProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddWine)
