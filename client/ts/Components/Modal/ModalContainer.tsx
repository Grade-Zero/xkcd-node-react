import { connect } from 'react-redux'
import { Modal } from './Modal'
import { RootState } from '../../store';
import { Dispatch } from 'redux';
import { actions } from '../../store/ui/action';

const mapStateToProps = (state: RootState) => ({
    modal: state.ui.modal
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
    closeModal() {
        dispatch(actions.closeModal())
    }
})

export type ComponentProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Modal)

