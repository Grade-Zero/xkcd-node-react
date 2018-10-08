import { connect } from 'react-redux'
import { Comics } from './Comics'
import { RootState } from '../../store';
import { Dispatch } from 'redux';
import { withRouter } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';

const mapStateToProps = (state: RootState) => ({
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
})

export type ComponentProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps> & RouteComponentProps<{id: number}>

const connectedComponent = connect(mapStateToProps, mapDispatchToProps)(Comics)
export default (withRouter as any)(connectedComponent)
