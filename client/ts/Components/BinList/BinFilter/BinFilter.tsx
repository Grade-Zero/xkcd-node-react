import * as _ from 'lodash'
import * as React from 'react'
// @ts-ignore No typings
import NumericInput from 'react-numeric-input';
import { ComponentProps } from './BinFilterContainer'
import { FilterModel } from '../../../store/ui/models'
import { BinType } from '../../../../../src/models/bin';
import { Wall as WallModel } from '../../../../../src/models/wall'

const defaultState = {
    binNameSearch: '',
    spaceAvailableSearch: '',
    wallFilter: '',
    binTypeFilter: ''
}

export class BinFilter extends React.Component<ComponentProps, typeof defaultState> {

    constructor(props: any) {
        super(props)
        this.state = _.cloneDeep(defaultState)

        this.handleNameChange = this.handleNameChange.bind(this)
    }

    handleNameChange = (e: any) => {
        let searchVal = e.target.value
        this.setState({
            binNameSearch: searchVal
        })
        this.props.updateBottleSearch(_.lowerCase(searchVal))
    }

    handleSpaceAvailableSearch = (valueAsNumber: any, valueAsString: any, input: any) => {
        this.setState({
            spaceAvailableSearch: valueAsString
        })
        this.props.updateBinCapacityFilter(valueAsString)
    }

    handleBinTypeChange = (e: any) => {
        let binType = e.target.value
        this.setState({
            binTypeFilter: binType
        })
        this.props.updateBinTypeFilter(binType)
    }

    handleWallChange = (e: any) => {
        let wall = e.target.value
        this.setState({
            wallFilter: e.target.value
        })
        this.props.updateWallFilter(wall)
    }

    render() {
        return (
            <div className='filter-area'>
                <div className='filter-list'>
                    <div className='filter'>
                        <label>name</label>
                        <input type='text' name='bin-name' value={this.state.binNameSearch} placeholder='Bin name' onChange={(e) => this.handleNameChange(e)} />
                    </div>
                    <div className='filter'>
                        <label>spaces available</label>
                        <NumericInput name='bin-spaces' value={this.state.spaceAvailableSearch} placeholder='Available bin spaces' onChange={this.handleSpaceAvailableSearch.bind(this)} />
                    </div>
                    <div className='filter'>
                        <label>type</label>
                        <select name='wall' value={this.state.binTypeFilter} onChange={this.handleBinTypeChange.bind(this)}>
                            <option value=''>All</option>
                            {_.map(this.props.binTypes, (binType: BinType, index: number) => {
                                    return (
                                        <option key={index} value={binType.id}>{_.capitalize(binType.type_name)}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div className='filter'>
                        <label>wall</label>
                        <select name='wall' onChange={this.handleWallChange.bind(this)}>
                            <option value=''>All</option>
                            {_.map(this.props.walls, (wall: WallModel, index: number) => {
                                    return (
                                        <option key={index} value={wall.id}>{_.capitalize(wall.name)}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                </div>
            </div>
        )
    }
}
