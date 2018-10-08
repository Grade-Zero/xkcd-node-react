import * as React from 'react'
import { ComponentProps } from './AppContainer'
import HeaderContainer from '../Header/HeaderContainer'
import HomeContainer from '../Home/HomeContainer'
import ComicsContainer from '../Comics/ComicsContainer'
import ComicContainer from '../Comic/ComicContainer'
import { Loading } from '../Loading/Loading'
import { Comic } from '../Comic/Comic'
import { Switch, Route, Redirect } from 'react-router-dom';
import { ClientRoutes } from '../../../../api/enum';

const defaultState = {
    loading: true
}

export class App extends React.Component<ComponentProps, typeof defaultState> {

    constructor(props: any) {
        super(props)
        this.state = defaultState
    }

    componentWillMount() {
        this.setState({loading: true}, async () => {
            await this.props.load()
            this.setState({loading: false})
        })
    }

    fetchComic() {
        this.setState({loading: true}, async () => {
            await this.props.load()
            this.setState({loading: false})
        })
    }

    public render() {
        return (
            <div>
                 <HeaderContainer />
                 {this.state.loading ?
                 (
                     <Loading />
                 ) : (
                     <div>
                        {(<Switch>
                            <Route path={ClientRoutes.comics} component={ComicsContainer} />
                            <Redirect to={ClientRoutes.comics} />
                        </Switch>)}
                    </div>
                 )}
            </div>
        )
    }
}
