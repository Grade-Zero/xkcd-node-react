import * as _ from 'lodash'
import { connect } from 'react-redux'

import { Wall } from './Wall'
import { RootState } from '../../store';
import { Dispatch } from 'redux';
import { Wall as WallModel } from '../../../../src/models/wall'

const mapStateToProps = (state: RootState, ownProps: {wall: WallModel}) => ( {
    wall: ownProps.wall,
    wallFilter: state.ui.wallFilter
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
})

export type ComponentProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Wall)

