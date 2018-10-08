import * as React from 'react'
import * as _ from 'lodash'
import './style.scss'
import { ComponentProps } from './HomeContainer'
import { ComicDb, Comic } from '../../../../api/models/xkcd';
import { Link } from 'react-router-dom';
import { ClientRoutes } from '../../../../api/enum';

const defaultState = {
    loading: true
}

export class Home extends React.Component<ComponentProps, typeof defaultState> {

    constructor(props: any) {
        super(props)
        this.state = defaultState
    }

    public render() {
        console.log('home render')
        return (
            <div className='comic-container'>
                {(this.props.comics.length === 0 && !this.state.loading) && (
                    <div className='no-content-found'>
                        <h1>Nothing to see here</h1>
                    </div>
                )}
                {(this.props.comics.length) ?
                    (
                        _.map(this.props.comics, (comic: ComicDb, index: number) => {
                            return(
                                <div className='comic' key={index}>
                                    {/* <Link to={ClientRoutes.comic}> */}
                                    <Link to={'/comics/comics/' + comic.id}>
                                        <h2>{comic.title}</h2>
                                        <img src={comic.url} />
                                    </Link>
                                </div>
                            )
                        })
                    ) :
                    (
                        console.log(this.props)
                    )
                }
            </div>
        )
    }
}
