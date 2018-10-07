import * as express from 'express'
import { NotAuthenticated } from './custom_error';
import { getSessionById } from '../db/session';
import { isValidSession } from '../services/authentication';
import { getUserById } from '../db/user';
import { SessionDb } from '../models/session';

const cookieName = 'xkcd_session'
export async function expressAuthentication(request: express.Request, securityName: string, scopes?: string[]): Promise<any> {
    if (securityName === cookieName) {
        let sessionId: null | string = null;
        if (request && request.cookies[cookieName]) {
            sessionId = request.cookies[cookieName]
        }
        if (!sessionId) {
            throw new NotAuthenticated()
        }

        let session = await getSessionById(null, sessionId)
        let valid = isValidSession(session)

        if (!valid) {
            throw new NotAuthenticated()
        }
        let user = await getUserById(null, (session as SessionDb).user_id)
        return user
    }
};
