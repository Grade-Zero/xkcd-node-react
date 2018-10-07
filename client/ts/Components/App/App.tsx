import * as _ from 'lodash'
import * as React from 'react'
import { ComponentProps } from './AppContainer'
import HomeContainer from '../Home/HomeContainer'
import { Loading } from '../Loading/Loading'
import { ComicDb } from '../../../../api/models/xkcd';

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

    public render() {
        return (
            this.state.loading ?
            (<Loading />) :
            (
                <div>
                    <HomeContainer />
                    {/* <h1>Nothing to see here</h1>
                    {this.props.comics.length > 0 &&
                        _.map(this.props.comics, (comic: ComicDb, index: number) => {
                            return(
                                <h2 key={index}>{comic.title}</h2>
                            )
                        })}
                    } */}
                    <a onClick={this.fetchComic.bind(this)}>Fetch Another</a>
                </div>
            )
        )
    }
}
