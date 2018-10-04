import * as _ from 'lodash'
import * as React from 'react'
import './style.scss'

export class WineListItem extends React.Component<{className: string, wineMouseOver: Function, handleBottleClick: Function, tableControl: any, bottle: any}> {

    constructor(props: any) {
        super(props)
    }

    public render() {
        return (
            <ul
                className={this.props.className}
                onMouseEnter={this.props.wineMouseOver.bind(this, this.props.bottle)}
                onClick={this.props.handleBottleClick.bind(this, this.props.bottle)}>
                {this.props.tableControl.name ? (
                    <li>{this.props.bottle.name}</li>
                ) : (
                        <li className='unchecked'></li>
                    )
                }
                {this.props.tableControl.vineyard ? (
                    <li>{this.props.bottle.vineyard}</li>
                ) : (
                        <li className='unchecked'></li>
                    )
                }
                {this.props.tableControl.color ? (
                    <li>{this.props.bottle.color}</li>
                ) : (
                        <li className='unchecked'></li>
                    )
                }
                {this.props.tableControl.type ? (
                    <li>{this.props.bottle.type}</li>
                ) : (
                        <li className='unchecked'></li>
                    )
                }
                {this.props.tableControl.cellarUntil ? (
                    <li>{this.props.bottle.cellar_until}</li>
                ) : (
                        <li className='unchecked'></li>
                    )
                }
                {this.props.tableControl.expiry ? (
                    <li>{this.props.bottle.expiry}</li>
                ) : (
                        <li className='unchecked'></li>
                    )
                }
                {this.props.tableControl.rating ? (
                    <li>{this.props.bottle.rating}</li>
                ) : (
                        <li className='unchecked'></li>
                    )
                }
                {this.props.tableControl.purchaseCost ? (
                    <li>{this.props.bottle.purchase_cost}</li>
                ) : (
                        <li className='unchecked'></li>
                    )
                }
                {this.props.tableControl.retailValue ? (
                    <li>{this.props.bottle.retail_value}</li>
                ) : (
                        <li className='unchecked'></li>
                    )
                }
            </ul>
        )
    }
}

