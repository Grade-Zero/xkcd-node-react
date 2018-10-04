import { CompanyDb } from '../../../../src/models/company'
export enum ActiveCompanyActionTypes {
    SET_ACTIVE_COMPANY = 'SET_ACTIVE_COMPANY'
}
export const actions = {
    setActiveCompany: (company: CompanyDb) => ({
        type: ActiveCompanyActionTypes.SET_ACTIVE_COMPANY as ActiveCompanyActionTypes.SET_ACTIVE_COMPANY,
        company: company
    }),
}

export type Actions = ReturnType<typeof actions[keyof typeof actions]>
