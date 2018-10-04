import { Route, Get, Tags, Request, Security } from 'tsoa';
import { StandardResponse } from '../models/standard';
import * as express from 'express'
import { companyById } from '../services/company';
import { NotAuthorized } from '../utils/custom_error';
import { userById } from '../services/user';
import { CompanyDb } from '../models/company';

@Route('company')
export class CompanyController {

    @Get('{id}')
    @Tags('Authenticated')
    @Security('cellar_session')
    public async ById(@Request() request: express.Request, id: number): Promise<StandardResponse<CompanyDb>> {
        let userId = request.user.id
        let company = await companyById(id)
        if (!company) {
            throw new NotAuthorized() // Prevent scraping
        }
        let user = await userById(userId)
        if (user.company_id !== company.id) {
            throw new NotAuthorized()
        }

        return {
            data: company,
            meta: {}
        };
    }

}

