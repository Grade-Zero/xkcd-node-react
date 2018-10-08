import * as React from 'react'
import * as _ from 'lodash'
import './style.scss'
import { ComponentProps } from './HomeContainer'
import { ComicDb, Comic } from '../../../../api/models/xkcd';
import { Link } from 'react-router-dom';
import { ClientRoutes } from '../../../../api/enum';
import { Loading } from '../Loading/Loading';

const defaultState = {
    loading: false
}

export class Home extends React.Component<ComponentProps, typeof defaultState> {

    constructor(props: any) {
        super(props)
        this.state = defaultState
    }

    fetchNewComics() {
        this.setState({loading: true}, async () => {
            await this.props.reload(this.props.comics)
            this.setState({loading: false})
        })
    }

    async apiBatch() {
        this.setState({loading: true}, async () => {
            await this.props.loadBatch()
            this.setState({loading: false})
        })
    }

    public render() {
        return (
            <div>
                {this.state.loading ?
                 (
                     <Loading />
                 ) : (
                    <div>
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
                                    console.log('Nothing')
                                )
                            }
                        </div>
                        <div className='comic-footer'>
                            <a className='btn' onClick={this.fetchNewComics.bind(this)}>Fetch Grid</a>
                            <a className='btn' onClick={this.apiBatch.bind(this)}>Fetch More</a>
                        </div>
                    </div>
                 )}
            </div>
        )
    }
}
