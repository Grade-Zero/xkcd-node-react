import * as _ from 'lodash'
import * as React from 'react'
import { ComponentProps } from './AppContainer'
import { Loading } from '../Loading/Loading'
import { UserApi } from '../../../../api/models/user';
import CellarContainer from '../Cellar/CellarContainer';
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
                    <h1>Nothing to see here</h1>
                    {this.props.comics.length > 0 &&
                        _.map(this.props.comics, (comic: ComicDb) => {
                            return(
                                <h2>{comic.title}</h2>
                            )
                        })
                    }
                </div>
            )
        )
    }
}
