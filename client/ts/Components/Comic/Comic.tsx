import * as React from 'react'
import * as _ from 'lodash'
import './style.scss'
import { ComponentProps } from './ComicContainer'
import { ComicDb } from '../../../../api/models/xkcd';
import { Link } from 'react-router-dom';

const defaultState = {
    comic: null as ComicDb[] | null
}

export class Comic extends React.Component<ComponentProps, typeof defaultState> {

    constructor(props: any) {
        super(props)
        this.state = defaultState
    }

    async componentWillMount() {
        let comic: ComicDb[] = await this.props.fetch(this.props.match.params.id)
        this.setState({
            comic: comic
        })
    }

    public render() {
        if (!_.isNull(this.state.comic)) {
            console.log(this.state.comic[0].title)
        }
        return (
            <div>
                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', padding: '20px'}}>
                    <Link to={'/comics/comics/'}>
                        <a className='btn'>Back</a>
                    </Link>
                    <h1>{!_.isNull(this.state.comic) ? (this.state.comic[0].title) : ('No comic found')}</h1>
                    <p>{this.props.match.params.id}</p>
                </div>
                <div style={{display: 'flex', justifyContent: 'center', padding: '20px'}}>
                    <img src={!_.isNull(this.state.comic) ? this.state.comic[0].url : ''} />
                </div>
            </div>
        )
    }
}
