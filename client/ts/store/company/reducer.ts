import * as _ from 'lodash'
import { combineReducers } from 'redux'
import { Actions, ActiveCompanyActionTypes } from './action';
import { CompanyDb } from '../../../../src/models/company';


const active = (
    state = null as null | CompanyDb,
    action: Actions
  ): typeof state => {
  switch (action.type) {
    case ActiveCompanyActionTypes.SET_ACTIVE_COMPANY:
      return action.company
    default:
      return state
  }
}

export default combineReducers({
  active
})

