import * as _ from 'lodash'
import { combineReducers } from 'redux'
import { Actions, ActiveUserActionTypes, UserActionTypes } from './action';
import { UserApi } from '../../../../src/models/user';


const active = (
    state = null as null | UserApi,
    action: Actions
  ): typeof state => {
  switch (action.type) {
    case ActiveUserActionTypes.SET_ACTIVE_USER:
      return action.user
    default:
      return state
  }
}

const list = (
    state = [] as UserApi[],
    action: Actions
  ): typeof state => {
  switch (action.type) {
    case UserActionTypes.SET_COMPANY_USER_LIST:
      return action.users
    default:
      return state
  }
}

export default combineReducers({
  active,
  list
})

