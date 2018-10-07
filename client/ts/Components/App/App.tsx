import * as React from 'react'
import { ComponentProps } from './AppContainer'
import { Header } from '../Header/Header'
import HeaderContainer from '../Header/HeaderContainer'
import HomeContainer from '../Home/HomeContainer'
import { Loading } from '../Loading/Loading'
import { Comic } from '../Comic/Comic'
import { Switch, Route, Redirect } from 'react-router';
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
        console.log('componentWillMount')
        this.setState({loading: true}, async () => {
            await this.props.load()
            // await this.props.loadTest()
            this.setState({loading: false})
        })
    }

    fetchComic() {
        this.setState({loading: true}, async () => {
            await this.props.load()
            this.setState({loading: false})
        })
    }

    fetchNewComics() {
        this.setState({loading: true}, async () => {
            await this.props.reload(this.props.comics)
            this.setState({loading: false})
        })
    }

    async apiBatch() {
        console.log('load new batch')
        await this.props.loadBatch()
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
                        {/* {(<Switch>
                            <Route path={ClientRoutes.comics} component={HomeContainer} />
                            <Route path={ClientRoutes.comic} component={Comic} />
                            <Redirect to={ClientRoutes.comics} />
                        </Switch>)} */}
                        <HomeContainer />
                        <div className='comic-footer'>
                            <a className='btn' onClick={this.fetchNewComics.bind(this)}>Fetch Another</a>
                            <a className='btn' onClick={this.apiBatch.bind(this)}>Load More</a>
                        </div>
                    </div>
                )}
            </div>
        )
    }
}
