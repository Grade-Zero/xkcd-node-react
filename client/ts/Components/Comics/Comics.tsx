import * as React from 'react'
import { ComponentProps } from './ComicsContainer'
import { Loading } from '../Loading/Loading';
import { Switch, Route, Redirect } from 'react-router-dom';
import { ClientRoutes } from '../../../../api/enum';
import HomeContainer from '../Home/HomeContainer';
import ComicContainer from '../Comic/ComicContainer';

const defaultState = {
    loading: false
}

export class Comics extends React.Component<ComponentProps, typeof defaultState> {
    constructor(props: any) {
        super(props)
        this.state = defaultState
    }

    render() {
        console.log('comics render')
        return (
            (this.state.loading) ?
            ( <Loading /> ) :
            (
                <div style={{flex: 1}}>
                <Switch>
                    <Route exact path={ClientRoutes.comics} component={HomeContainer} />
                    <Route exact path={ClientRoutes.comic} component={ComicContainer} />
                    <Redirect to={ClientRoutes.comics} />
                </Switch>
                </div>
            )
        )
    }
}
