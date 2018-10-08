import * as React from 'react'
import { ComponentProps } from './HeaderContainer'

const defaultState = {
}

export class Header extends React.Component<ComponentProps, typeof defaultState> {

    constructor(props: any) {
        super(props)
        this.state = defaultState
    }

    public render() {
        return (
            <div className='comic-header'>
                <div className='logo'>
                    <h1>XKCD comics</h1>
                </div>
            </div>
        )
    }
}
