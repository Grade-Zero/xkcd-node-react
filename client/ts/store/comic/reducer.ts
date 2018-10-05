import * as _ from 'lodash'
import { combineReducers } from 'redux'
import { Actions, ComicActionTypes } from './action';
import { ComicDb } from '../../../../api/models/xkcd';

const comics = (
  state = [] as ComicDb[],
  action: Actions
  ): typeof state => {
  switch (action.type) {
    case ComicActionTypes.SET_FETCHED_COMIC:
      return action.comics
    default:
      return state
  }
}

export default combineReducers({
  comics
})

