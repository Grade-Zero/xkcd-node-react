import * as _ from 'lodash'
import { CompanyDb } from '../models/company';
import { getCompanyById } from '../db/company';

export async function companyById(companyId: number): Promise<CompanyDb | null> {
    const company = await getCompanyById(null, companyId)
    return company
}

