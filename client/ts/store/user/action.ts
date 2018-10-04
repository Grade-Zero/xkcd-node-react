import { UserApi } from '../../../../src/models/user'
export enum ActiveUserActionTypes {
    SET_ACTIVE_USER = 'SET_ACTIVE_USER'
}
export enum UserActionTypes {
    SET_COMPANY_USER_LIST = 'SET_COMPANY_USER_LIST'
}
export const actions = {
    setActiveUser: (user: UserApi) => ({
        type: ActiveUserActionTypes.SET_ACTIVE_USER as ActiveUserActionTypes.SET_ACTIVE_USER,
        user: user
    }),
    setCompanyUserList: (users: UserApi[]) => ({
        type: UserActionTypes.SET_COMPANY_USER_LIST as UserActionTypes.SET_COMPANY_USER_LIST,
        users: users
    })
}

export type Actions = ReturnType<typeof actions[keyof typeof actions]>

