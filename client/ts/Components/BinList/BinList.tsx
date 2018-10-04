import * as _ from 'lodash'
import * as React from 'react'
import '../../../node_modules/react-input-slider/dist/input-slider.css';
import './style.scss'
import { Loading } from '../Loading/Loading'
import { ComponentProps } from './BinListContainer'
import { Bin as BinModel } from '../../../../src/models/bin'
import { Wall as WallModel } from '../../../../src/models/wall'

import Modal from '../Modal/ModalContainer'
import BottleFilterContainer from './BottleFilter/BottleFilterContainer'
import BinFilterContainer from './BinFilter/BinFilterContainer';
import WallContainer from '../Wall/WallContainer';
import { UserApi } from '../../../../src/models/user';
// @ts-ignore no types
import InputSlider from 'react-input-slider';

const defaultState = {
    loading: false,
    filtersVisible: true,
    binNameSearch: '',
    spaceAvailableSearch: '',
    wallFilter: '',
    binTypeFilter: '',
    bins: [] as BinModel[],
    walls: [] as WallModel[],
    bottleClicked: null,
    showModal: false,
    edit: false
}

export class BinList extends React.Component<ComponentProps, typeof defaultState> {

    constructor(props: any) {
        super(props)
        this.state = _.cloneDeep(defaultState)
    }

    filtersClick() {
        this.setState({ filtersVisible: !this.state.filtersVisible })
    }

    onCloseModal() {
        this.setState({ showModal: false });
    }

    editMode(value: boolean) {
        this.setState({
            edit: value
        })
        this.props.setEditMode(value)
        if (!value) {
            this.props.setMoveMode(value)
            this.props.setMoveBottles([])
        }
    }

    moveBottles() {
        this.props.setMoveMode(true)
        this.props.setEditMode(false)
    }

    async removeBottles() {
        if (confirm('Archive these bottles?')) {
            this.setState({ loading: true })
            await this.props.removeBottles(this.props.user as UserApi, this.props.editBottles)
            this.setState({ loading: false })
            this.editMode(false)
        }
    }

    public render() {
        let filtersVisible = 'filters'
        if (!this.state.filtersVisible) {
            filtersVisible = 'filters hide'
        }
        return (
            this.state.loading ?
            ( <Loading /> ) :
            (
                <div className='cellar-area'>
                    <div className='cellar-toolbar'>
                        <div className='button-group left'>
                            <button className='cellar-action-button override' onClick={this.filtersClick.bind(this)}>{this.state.filtersVisible ? 'hide filters' : 'show filters'}</button>
                        </div>
                        <div>
                            <InputSlider
                                style={{width: '125px'}}
                                className='slider slider-xy'
                                axis='x'
                                x={this.props.binScale}
                                xmax={30}
                                xmin={12}
                                xstep={2}
                                onChange={(obj: any) => {
                                    this.props.changeBinScale(obj.x)
                                }}
                            />
                        </div>
                        <div className='button-group right' style={{paddingRight: '25px'}}>
                            <button className={(!this.props.edit && !this.props.move ) ? (this.props.wineFormActive ? 'cellar-action-button override disabled' : 'cellar-action-button override') : 'hide'} onClick={!this.props.wineFormActive ? this.editMode.bind(this, true) : undefined}>edit</button>
                            <button className={this.props.edit ? (this.props.editBottles && this.props.editBottles.length > 0 ? 'cellar-action-button override' : 'cellar-action-button override disabled') : 'hide'} onClick={this.props.editBottles && this.props.editBottles.length > 0 ? this.removeBottles.bind(this) : undefined}>remove</button>
                            <button className={this.props.edit ? (this.props.editBottles && this.props.editBottles.length > 0 ? 'cellar-action-button override' : 'cellar-action-button override disabled') : 'hide'} onClick={this.props.editBottles && this.props.editBottles.length > 0 ? this.moveBottles.bind(this) : undefined}>move</button>
                            <button className={(this.props.edit || this.props.move) ? 'cellar-action-button override is-active' : 'hide'} onClick={this.editMode.bind(this, false)}>cancel</button>
                        </div>
                        <div className='button-group end'>
                            <ul>
                                <a ui-sref='login'>
                                    <li style={{color: 'beige'}}>Logout</li>
                                </a>
                            </ul>
                        </div>
                    </div>

                    <div className={filtersVisible}>
                        <BinFilterContainer />
                        <BottleFilterContainer />
                    </div>

                    <div className='cellar'>
                        <div className='loading-cellar hide'>
                            <p>Updating Cellar</p>
                        </div>
                        <div className='cellar-scroll'>
                            {this.props.walls.length > 0 ?
                            (
                                <div>
                                    {_.map(this.props.walls, (wall: WallModel, index: number) => {
                                        return (
                                            <WallContainer key={index} wall={wall} />
                                        )
                                    })}
                                </div>
                            ) :
                            (
                                <div className='empty-wall'>
                                    <p>no results returned</p>
                                </div>
                            )
                        }
                        </div>
                    </div>
                    <Modal />
                </div>
            )
        )
    }
}
