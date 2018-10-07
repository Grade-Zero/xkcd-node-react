import * as React from 'react'
import { ComicDb } from '../../../../api/models/xkcd';

export class Comic extends React.Component<{comic: ComicDb}, null> {

    constructor(props: any) {
        super(props)
    }

    public render() {
        return (
            <div>
                <h1>{this.props.comic.title}</h1>
                <img src={this.props.comic.url} />
            </div>
        )
    }
}
