import * as React from 'react'
import moment from 'moment'
import './style.scss'
import { ComponentProps } from './BottleDetailContainer'

const defaultState = {
    no: true
}

export class BottleDetail extends React.Component<ComponentProps, typeof defaultState> {
    constructor(props: any) {
        super(props)
        this.state = defaultState
    }

    render() {
        return (
            this.props.bottle ? (
            <div className='bottle-detail'>
                <h2 className='detail-title'>{this.props.bottle.name}</h2>
                <h2>{this.props.bottle.vineyard}</h2>
                <div className='detail-list'>
                    <div className='detail-section'>
                        <span className='detail-header'>id:</span>
                        <span className='detail-body'>{this.props.bottle.id}</span>
                    </div>
                    <div className='detail-section'>
                        <span className='detail-header'>SKU:</span>
                        <span className='detail-body'>{this.props.bottle.sku}</span>
                    </div>
                    <div className='detail-section'>
                        <span className='detail-header'>Vineyard:</span>
                        <span className='detail-body'>{this.props.bottle.vineyard}</span>
                    </div>
                    <div className='detail-section'>
                        <span className='detail-header'>Colour:</span>
                        <span className='detail-body'>{this.props.bottle.color}</span>
                    </div>
                    <div className='detail-section'>
                        <span className='detail-header'>Country:</span>
                        <span className='detail-body'>{this.props.bottle.country}</span>
                    </div>
                    <div className='detail-section'>
                        <span className='detail-header'>Varietal:</span>
                        <span className='detail-body'>{this.props.bottle.type}</span>
                    </div>
                    <div className='detail-section'>
                        <span className='detail-header'>Vintage:</span>
                        <span className='detail-body'>{this.props.bottle.year}</span>
                    </div>
                    <div className='detail-section'>
                        <span className='detail-header'>Cellar Until:</span>
                        <span className='detail-body'>{moment(this.props.bottle.cellar_until).format('YYYY')}</span>
                    </div>
                    <div className='detail-section'>
                        <span className='detail-header'>Expiry:</span>
                        <span className='detail-body'>{moment(this.props.bottle.expiry).format('YYYY')}</span>
                    </div>
                    <div className='detail-section'>
                        <span className='detail-header'>Purchase Cost:</span>
                        <span className='detail-body'>{this.props.bottle.purchase_cost}</span>
                    </div>
                    <div className='detail-section'>
                        <span className='detail-header'>Retail Value:</span>
                        <span className='detail-body'>{this.props.bottle.retail_value}</span>
                    </div>
                    <div className='detail-section'>
                        <span className='detail-header'>Date Added:</span>
                        <span className='detail-body'>{moment(this.props.bottle.added_on as string).format('DD/MM/YYYY')}</span>
                    </div>
                    <div className='detail-section'>
                        <span className='detail-header'>Rating:</span>
                        <span className='detail-body'>{this.props.bottle.rating}</span>
                    </div>
                </div>
            </div>
            )
            :
            (
            <div>
            </div>
            )
        )
    }
}
