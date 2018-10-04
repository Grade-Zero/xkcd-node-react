import { Route, Get, Post, Tags, Body, Request, Controller, Security } from 'tsoa';
import { StandardResponse } from '../models/standard';
import { LoginReqApi, LoginResApi, LogoutResApi } from '../models/authenticate';
import { login, deleteSession } from '../services/authentication';
import * as cookie from 'cookie'
import { config } from '../config';

@Route('authentication')
export class AuthenticationController extends Controller {
    /**
     * Creates a new session token and set it as a cookie
     * @param request Login credentials.
     */
    @Post('login')
    @Tags('Open')
    public async Login(
        @Body() body: LoginReqApi
    ): Promise<StandardResponse<LoginResApi>> {
        const data = await login(body)

        let resCookie = cookie.serialize('cellar_session', String(data.session.id), {
            path: '/',
            httpOnly: true,
            maxAge: 60 * 60 * 24 * 7 * 52 * 2 // 2 years
        })
        this.setHeader('Set-Cookie', resCookie)

        return {data: {
            sessionId: data.session.id,
            username: data.username
        }, meta: {}};
    }

    /**
     * Confirms whether the current session is valid
     */
    @Get('valid_session')
    @Tags('Authenticated')
    @Security('cellar_session')
    public async ValidSession(
        @Request() request: any
    ): Promise<StandardResponse<LogoutResApi>> {
        return {data: {success: true}, meta: {}};
    }

    /**
     * Deletes a session from the db and logs the user out
     */
    @Post('logout')
    @Tags('Open')
    public async Logout(
        @Request() request: any
    ): Promise<StandardResponse<LogoutResApi>> {
        console.log(request.cookies[config.sessionName])
        await deleteSession(request.cookies[config.sessionName])
        let resCookie = cookie.serialize('cellar_session', 'deleted', {
            path: '/',
            httpOnly: true,
            maxAge: (60 * 60 * 24 * 7 * 52 * 2 * -1) // expires cookie
        })
        this.setHeader('Set-Cookie', resCookie)
        return {data: {success: true}, meta: {}};
    }
}

