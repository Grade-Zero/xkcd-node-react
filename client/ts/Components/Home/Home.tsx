import * as React from 'react'
import * as _ from 'lodash'
import { ComponentProps } from './HomeContainer'
import { ComicDb, Comic } from '../../../../api/models/xkcd';

const defaultState = {
    loading: true
}

export class Home extends React.Component<ComponentProps, typeof defaultState> {

    constructor(props: any) {
        super(props)
        this.state = defaultState
    }

    public render() {
        console.log(this.props.comics)
        console.log('length', this.props.comics.length)
        console.log('isNull', _.isNull(this.props.comics))
        return (
            <div>
                {(this.props.comics.length === 0 && !this.state.loading) && (
                    <div className='no-content-found'>
                        <h1>Nothing to see here, ya dig</h1>
                    </div>
                )}
                {(this.props.comics.length) ?
                    (
                        _.map(this.props.comics, (comic: Comic, index: number) => {
                            console.log('oi')
                            return(
                                <div key={index}>
                                    <h2>{comic.title}</h2>
                                    <img src={comic.url} />
                                </div>
                            )
                        })
                    ) :
                    (
                        console.log(this.props)
                        // <h1>Bloody empty still</h1>
                    )
                }
            </div>
        )
    }
}
