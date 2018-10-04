import * as React from 'react'
import { ComponentProps } from './AppContainer'
import { Loading } from '../Loading/Loading'
import { UserApi } from '../../../../api/models/user';
import CellarContainer from '../Cellar/CellarContainer';

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
                    <h1>Fetching, nothing to see here</h1>
                </div>
            )
        )
    }
}
