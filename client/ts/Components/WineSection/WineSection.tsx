import * as _ from 'lodash'
import * as React from 'react'
import '../WineList/style.scss'
import './style.scss'
import { Loading } from '../Loading/Loading'
import WineListContainer from '../WineList/WineListContainer'
import AddWineContainer from '../AddWine/AddWineContainer'
import { ComponentProps } from './WineSectionContainer'

const defaultState = {
    loading: false,
    extendedView: false,
    addWineForm: false
}

export class WineSection extends React.Component<ComponentProps, typeof defaultState> {
    constructor(props: any) {
        super(props)
        this.state = _.cloneDeep(defaultState)
    }

    extendClick() {
        this.setState({ extendedView: !this.state.extendedView })
    }

    handleFormClick() {
        this.setState({
            addWineForm: true
        })
        this.props.changeWineFormActive(true)
        this.props.setEditMode(false)
        this.props.setMoveBottles([])
    }

    handleListClick() {
        this.setState({
            addWineForm: false
        })
        this.props.changeWineFormActive(false)
    }

    public render() {
        let extend = 'cellar-info'
        if (this.state.extendedView) {
            extend = 'cellar-info extended'
        }
        let checked

        return (
        (this.state.loading) ?
            (
                <div>
                    <Loading />
                </div>
            ) :
            (
                <div id='cellar-info' className={extend}>
                    <div className='table-header'>
                        <div className='logo'>
                            <a><h1>Cellar.</h1></a>
                        </div>
                        <div className='button-group'>
                            <button className={!this.state.addWineForm ? 'override is-active' : 'override' } onClick={this.handleListClick.bind(this)}>Wine List</button>
                            <button className={this.state.addWineForm ? 'override is-active' : 'override' } onClick={this.handleFormClick.bind(this)}>Add Wine</button>
                            <button className='override' onClick={this.extendClick.bind(this)}>Extend</button>
                        </div>
                    </div>
                    {this.state.addWineForm ?
                    (
                        <AddWineContainer cancel={this.handleListClick.bind(this)} />
                    ) :
                    (
                        <WineListContainer />
                    )}
                </div>
            )
        )
    }
}
