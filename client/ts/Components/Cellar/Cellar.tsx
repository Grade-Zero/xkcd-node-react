import * as React from 'react'
import WineSectionContainer from '../WineSection/WineSectionContainer'
import BinListContainer from '../BinList/BinListContainer'
import { ComponentProps } from './CellarContainer'
import { Loading } from '../Loading/Loading'
import { UserApi } from '../../../../src/models/user';

const defaultState = {
    wine: null,
    loading: true
}

export class Cellar extends React.Component<ComponentProps, typeof defaultState> {

    constructor(props: any) {
        super(props)
        this.state = defaultState
    }

    componentWillMount() {
        let user = this.props.user as UserApi
        this.setState({loading: true}, async () => {
            await this.props.loadData(user.id)
            this.setState({loading: false})
        })
    }

    public render() {
        return (
            this.state.loading ?
            (<Loading />) :
            (
                <div>
                    <div className='page-holder add-wine'>
                        <WineSectionContainer />
                        <BinListContainer />
                    </div>
                </div>
            )
        )
    }
}
