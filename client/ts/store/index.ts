import { combineReducers } from 'redux'

import cellar from './cellar/reducer'
import ui from './ui/reducer'
import user from './user/reducer'
import company from './company/reducer'
import comic from './comic/reducer'

let reducers = {
    user,
    company,
    cellar,
    ui,
    comic
}

// This provides typings for the state
export type RootState = {
  [P in keyof typeof reducers]: ReturnType<typeof reducers[P]>
}

export default combineReducers(reducers)
