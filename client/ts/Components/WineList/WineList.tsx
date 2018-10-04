import * as _ from 'lodash'
import * as React from 'react'
import './style.scss'
import { Loading } from '../Loading/Loading'

import { ComponentProps } from './WineListContainer'
import { WineModel, ModalType } from '../../store/ui/models';
import { Bin as BinModel } from '../../../../src/models/bin'
import { Wall as WallModel } from '../../../../src/models/wall'
import { WineListItem } from './WineListItem';

let columns = ['name', 'vineyard', 'color', 'type', 'cellarUntil', 'expiry', 'rating', 'purchaseCost', 'retailValue']

const defaultState = {
    loading: false,
    extendedView: false,
    tableControl: {
        name: true,
        vineyard: true,
        color: true,
        type: true,
        cellarUntil: false,
        expiry: false,
        rating: false,
        purchaseCost: false,
        retailValue: false,
    },
    wine: [] as WineModel[],
    activeBottle: null
}

type tableColumns = keyof(typeof defaultState.tableControl)

export class WineList extends React.Component<ComponentProps, typeof defaultState> {

    constructor(props: any) {
        super(props)
        this.state = _.cloneDeep(defaultState)
    }

    extendClick() {
        this.setState({ extendedView: !this.state.extendedView })
    }

    controlClick(prop: string, val: Boolean) {
        this.setState(prevState => ({
            tableControl: {
                ...prevState.tableControl,
                [prop]: !val
            }
        }))
    }

    wineMouseOver(bottle: WineModel) {
        this.props.changeActiveWine(bottle)
    }

    handleBottleClick(bottle: WineModel) {
        this.props.changeSelectedWine(bottle)
        this.props.view(ModalType.bottle, this.props.modal)
    }

    generateBottleClass(bottle: WineModel) {
        let bottleClass = 'fake-table'

        if (!_.isNull(this.props.filter.vineyard) && this.props.filter.vineyard !== bottle.vineyard) { bottleClass = 'fake-table inactive' }
        if ((bottleClass !== 'fake-table inactive' && !_.isNull(this.props.filter.color)) && this.props.filter.color !== bottle.color) { bottleClass = 'fake-table inactive' }
        if ((bottleClass !== 'fake-table inactive' && !_.isNull(this.props.filter.year)) && Number(this.props.filter.year) !== Number(bottle.year)) { bottleClass = 'fake-table inactive' }
        if ((bottleClass !== 'fake-table inactive' && !_.isNull(this.props.filter.country)) && this.props.filter.country !== bottle.country) { bottleClass = 'fake-table inactive' }
        if ((bottleClass !== 'fake-table inactive' && !_.isNull(this.props.filter.type)) && this.props.filter.type !== bottle.type) { bottleClass = 'fake-table inactive' }
        if ((bottleClass !== 'fake-table inactive' && !_.isNull(this.props.filter.cellar_until)) && this.props.filter.cellar_until !== bottle.cellar_until) { bottleClass = 'fake-table inactive' }
        if ((bottleClass !== 'fake-table inactive' && !_.isNull(this.props.filter.expiry)) && this.props.filter.expiry !== bottle.expiry) { bottleClass = 'fake-table inactive' }
        if ((bottleClass !== 'fake-table inactive' && !_.isNull(this.props.filter.rating)) && Number(this.props.filter.rating) !== Number(bottle.rating)) { bottleClass = 'fake-table inactive' }
        if ((bottleClass !== 'fake-table inactive' && !_.isNull(this.props.filter.name)) && _.lowerCase(this.props.filter.name) !== _.lowerCase(bottle.name)) { bottleClass = 'fake-table inactive' }

        return bottleClass
    }

    public render() {
        let extend = 'cellar-info'
        if (this.state.extendedView) { extend = 'cellar-info extended' }
        let checked

        return (
            (this.state.loading) ?
            (
                <div>
                    <Loading />
                </div>
            ) :
            (
                <div className='cellar-table'>
                    {(this.props.walls.length === 0 && !this.state.loading) && (
                        <div className='no-content-found'>
                            Cellar is empty
                        </div>
                    )}
                    <div className='table'>
                        <ul className='toggle-fields'>
                            {columns.map((column: tableColumns, index: number) => {
                                checked = this.state.tableControl[column]
                                return (
                                    <li key={index}>
                                        <span><input type='checkbox' defaultChecked={checked ? true : false} onClick={this.controlClick.bind(this, column, this.state.tableControl[column])} /></span>
                                        <span>{column}</span>
                                    </li>
                                )
                            })}
                        </ul>

                        <ul className='fake-header'>
                            {columns.map((column: tableColumns, index: number) => {
                                return (
                                    (this.state.tableControl[column] ? (
                                        <li key={index}>{column}</li>
                                    ) : (
                                        <li key={index} className='unchecked'>{column}</li>
                                    ))
                                )
                            })}
                        </ul>
                        <div className='fake-table-list'>
                            {this.props.walls.map((wall: WallModel, i: number) => {
                                return (
                                    <div key={i}>
                                        {wall.bins.map((bin: BinModel, ii: number) => {
                                            let binClass = 'bin-title'
                                            let bottlesActive = 0
                                            _.each(bin.bottles, (bottle: WineModel) => {
                                                let checkActivity = this.generateBottleClass(bottle)
                                                if (checkActivity.indexOf('inactive') < 0) { bottlesActive++ }
                                            })
                                            if (bottlesActive === 0) { binClass = 'hide' }
                                            return (
                                                (bin.bottles.length > 0) ?
                                                (
                                                <div key={ii}>
                                                    <div className={binClass}>
                                                        <p>
                                                            Bin: {bin.name}
                                                        </p>
                                                        <p>
                                                            [{bin.bottles.length} / {_.get(bin, 'bin_type.capacity', 0)}]
                                                        </p>
                                                    </div>
                                                    {_.map(bin.bottles, (bottle: WineModel, iii: number) => {
                                                        let bottleClass = 'fake-table'
                                                        bottleClass.indexOf('active') < 0 ? bottleClass = this.generateBottleClass(bottle) : bottleClass = bottleClass
                                                        if (!_.isEmpty(this.props.activeBottle) && bottleClass.indexOf('inactive') < 0) {
                                                            if (bottle.id === this.props.activeBottle.id) {
                                                                bottleClass = 'fake-table active'
                                                            }
                                                        }
                                                        return (
                                                            <WineListItem
                                                                key={iii}
                                                                tableControl={this.state.tableControl}
                                                                bottle={bottle}
                                                                className={bottleClass}
                                                                wineMouseOver={this.wineMouseOver.bind(this)}
                                                                handleBottleClick={this.handleBottleClick.bind(this)}
                                                            />
                                                        )
                                                    })}
                                                    </div>
                                                ) : (
                                                    <div key={ii}></div>
                                                )
                                            )
                                        })}
                                </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            )
        )
    }
}
