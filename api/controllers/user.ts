import { Route, Get, Tags, Request, Security, Query, Post, Body } from 'tsoa';
import { StandardResponse } from '../models/standard';
import * as express from 'express'
import { NotAuthorized } from '../utils/custom_error'
import { userById, getUserListByCompanyId } from '../services/user';
import { UserApi } from '../models/user';
import { ChangeStatusResponse } from './wine';

@Route('user')
export class UserController {

    @Get('active')
    @Tags('Authenticated')
    @Security('cellar_session')
    public async ById(@Request() request: express.Request): Promise<StandardResponse<UserApi>> {
        let userId = request.user.id
        let user = await userById(userId)

        return {
            data: user,
            meta: {}
        };
    }

    @Get('list/by_companyid/{companyId}')
    @Tags('Authenticated')
    @Security('cellar_session')
    public async UserList(
        @Request() request: express.Request,
        companyId: number
    ): Promise<StandardResponse<UserApi[]>> {
        let user = await userById(request.user.id)
        if (user.company_id !== companyId) {
            throw new NotAuthorized()
        }
        let data = await getUserListByCompanyId(companyId)
        return {data: data, meta: {}};
    }
}
