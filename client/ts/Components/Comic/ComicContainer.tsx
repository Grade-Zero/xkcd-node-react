import { connect } from 'react-redux'
import { Comic } from './Comic'
import { RootState } from '../../store';
import { Dispatch } from 'redux';
import { withRouter } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
import { generateApiUrl } from '../../services/api';
import axios from 'axios';
import { config } from '../../config';
import { actions as comicActions } from '../../store/comic/action'

const mapStateToProps = (state: RootState, ownProps: {comicId: number}) => ({
    comicId: ownProps.comicId
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
    fetch: async (id: number) => {
        let fetchPayload = await axios.get(generateApiUrl('/v1/xkcd/fetchByid/' + id), config.api.defaultConf)
        let comic = fetchPayload.data.data
        console.log(comic)
        // dispatch(comicActions.setComics(comic))
        return comic
    }
})

export type ComponentProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps> & RouteComponentProps<{id: number}>

const connectedComponent = connect(mapStateToProps, mapDispatchToProps)(Comic)
export default (withRouter as any)(connectedComponent)

// export default connect(
//     mapStateToProps,
//     mapDispatchToProps
// )(Comic)

