import { connect } from 'react-redux'
import { Home } from './Home'
import { RootState } from '../../store';
import { Dispatch } from 'redux';
import axios from 'axios';

const mapStateToProps = (state: RootState) => ({
    comics: null || state.comic.comics
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
})

export type ComponentProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home)

