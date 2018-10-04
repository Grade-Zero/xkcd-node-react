import * as _ from 'lodash'
import * as React from 'react'
import '../BinList/style.scss'
import { ComponentProps } from './WallContainer';
import { Bin as BinModel } from '../../../../src/models/bin'
import BinContainer from '../Bin/BinContainer';

const defaultState = {
    wine: null
}

export class Wall extends React.Component<ComponentProps, typeof defaultState> {

    constructor(props: any) {
        super(props)
        this.state = _.cloneDeep(defaultState)
    }

    public render() {
        let wall = this.props.wall
        wall.active = true
        let wallClass = 'wall'
        if (!_.isEmpty(this.props.wallFilter.wall) && (Number(this.props.wallFilter.wall) !== Number(wall.id))) {
            wallClass = 'wall inactive'
            wall.active = false
        }
        return (
            <div className={wallClass}> {/* ng-repeat="wall in filteredCellar.walls | filter:{name: binFilters.wallname}" */}
                <div className='wall-title'> {/* ng-show="wall.bins.length > 0" */}
                    <h3>{wall.name} wall - {wall.bins.length} Bins</h3>
                </div>

                <div className='wall-grid'>
                    {_.map(wall.bins, (bin: BinModel, i: number) => {
                        return (
                            <BinContainer key={i} bin={bin} wall={wall} />
                        )
                    })}
                </div>
            </div>
        )
    }
}
