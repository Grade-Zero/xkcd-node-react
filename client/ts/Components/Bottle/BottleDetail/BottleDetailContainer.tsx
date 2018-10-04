import { connect } from 'react-redux'
import { BottleDetail } from './BottleDetail'
import { RootState } from '../../../store';
import { Dispatch } from 'redux';

const mapStateToProps = (state: RootState) => ( {
    bottle: state.cellar.selectedBottle.bottle
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
})

export type ComponentProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BottleDetail)
