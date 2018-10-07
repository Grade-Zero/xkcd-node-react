import { connect } from 'react-redux'
import { Header } from './Header'
import { RootState } from '../../store';
import { Dispatch } from 'redux';

const mapStateToProps = (state: RootState) => ({
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
})

export type ComponentProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Header)

