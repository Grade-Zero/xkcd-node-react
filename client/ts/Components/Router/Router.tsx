import * as _ from 'lodash'
import * as React from 'react'
import axios from 'axios'
import { Loading } from '../Loading/Loading';
import { Login } from '../Login/Login';
import AppContainer from '../App/AppContainer'
import { Route, Switch, Redirect } from 'react-router-dom'

const defaultState = {
    authenticated: undefined as undefined | boolean
}

export class Router extends React.Component<{}, typeof defaultState> {
    constructor(props: any) {
        super(props)
        this.state = _.cloneDeep(defaultState)
    }

    componentWillMount() {
        this.verifyAuthenticated()
    }

    async verifyAuthenticated(authenticated?: boolean, callback?: any) {
        if (_.isBoolean(authenticated)) {
            this.setState({
                authenticated: authenticated
            }, callback)
            return
        }
        try {
            let result = await axios.get('/v1/authentication/valid_session')
            console.log(result)
            this.setState({
                authenticated: result.data.data.success,
            }, callback)
        } catch (e) {
            this.setState({
                authenticated: false,
            })
        }
    }

    render() {
        return (this.state.authenticated !== undefined) ? (
            <Switch>
                <PublicRoute path='/cellar/' authenticated={this.state.authenticated} component={AppContainer} />
                <Redirect to='/404' />
            </Switch>
        ) : (
            <Loading />
        )
    }
}

// https://tylermcginnis.com/react-router-protected-routes-authentication/
// tslint:disable-next-line:variable-name
const PrivateRoute = ({ component: Component, authenticated: authenticated, ...rest }: any) => (
    <Route {...rest} render={props => (
         authenticated ? (
            <Component {...props} />
        ) : (
                <Redirect to={{
                    pathname: '/cellar/login',
                    state: { from: props.location }
                }} />
            )
    )} />
)

// tslint:disable-next-line:variable-name
const PublicRoute = ({ component: Component, verifyAuthenticated: verifyAuthenticated, ...rest }: any) => {
    return (
        <Route {...rest} render={props => {
            return <Component {...props} verifyAuthenticated={verifyAuthenticated} />
        }} />
    )
}
