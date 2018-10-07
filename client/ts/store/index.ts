import { combineReducers } from 'redux'
import comic from './comic/reducer'

let reducers = {
    comic
}

// This provides typings for the state
export type RootState = {
  [P in keyof typeof reducers]: ReturnType<typeof reducers[P]>
}

export default combineReducers(reducers)
