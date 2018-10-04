import * as _ from 'lodash'
import * as React from 'react'
import { TableControl, WineModel } from '../../store/ui/models'

const defaultState = {
    wine: null
}

export class WineListRow extends React.Component<{wine: WineModel, tableControl: TableControl}, typeof defaultState> {

    constructor(props: any) {
        super(props)
        this.state = _.cloneDeep(defaultState)
    }

    public render() {
        return (
            <ul className='fake-table'>
                {this.props.tableControl.name ? (
                    <li>{this.props.wine.name}</li>
                    ) : (
                        <li></li>
                    )
                }
                <li>{this.props.wine.vineyard}</li>
                <li>{this.props.wine.color}</li>
                <li>{this.props.wine.type}</li>
                <li>{this.props.wine.cellar_until}</li>
                <li>{this.props.wine.expiry}</li>
                <li>{this.props.wine.rating}</li>
                <li>{this.props.wine.purchase_cost}</li>
                <li>{this.props.wine.retail_value}</li>
            </ul>
        )
    }
}
