export interface CompanyDb {
    id: number,
    company_type: string,
    name: string,
    contact_user_id: CompanyType,
}

export enum CompanyType {
    regular = 'regular',
}
