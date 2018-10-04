import * as React from 'react'
import './style.scss'

export class Loading extends React.Component {
    constructor(props: any) {
        super(props)
    }
    render() {

        return (
            <div className='spinner'>
                <div className='bounce1'></div>
                <div className='bounce2'></div>
                <div className='bounce3'></div>
            </div>
        )
    }
}
