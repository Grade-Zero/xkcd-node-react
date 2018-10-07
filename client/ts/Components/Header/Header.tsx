import * as React from 'react'
import { ComponentProps } from './HeaderContainer'

export class Header extends React.Component<ComponentProps, undefined> {

    constructor(props: any) {
        super(props)
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
