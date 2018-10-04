import { LoginReqApi } from '../models/authenticate';
import { InvalidRequest } from '../utils/custom_error';
import * as crypto from 'crypto'
import { SessionType, SessionDb } from '../models/session';
import { v4, v1 } from 'uuid'
import { getUserByUsername } from '../db/user'
import { createSession, invalidateSession } from '../db/session';

export async function login({username, password}: LoginReqApi): Promise<{username: string, session: SessionDb}> {
    const user = await getUserByUsername(null, username)
    if (user === null) {
        throw new InvalidRequest('Username or password is not valid.')
    }
    const correctPassword = comparePasswords(password, user.password)
    if (!correctPassword) {
        throw new InvalidRequest('Username or password is not valid.')
    }
    const session = generateSession(user.id, SessionType.general)
    await createSession(null, session)

    return {
        username,
        session
    }
}

export function comparePasswords(plainText: string, hashedPassword: string): boolean {
    let convertedPassword = crypto.createHash('sha256').update(plainText).digest('hex');
    return convertedPassword === hashedPassword
}

export function generateSession(userId: number, type: SessionType): SessionDb {
    const timeFromNow = (type === SessionType.general) ?
        (1000 * 60 * 60 * 24 * 365) : // long term login session = 1 year
        (1000 * 60 * 60 * 12) // temp sessions like password recovery = 12 hours
    const expiry = new Date(Date.now() + timeFromNow)

    const id = (v4() + v1()).split('-').join('')
    return {
        id: id,
        type: type,
        expiry: expiry,
        user_id: userId,
        deactivated: false,
        created_at: new Date()
    }
}

export function isValidSession(session: SessionDb | null): boolean {
    if (session === null) {
        return false
    }
    return !session.deactivated && new Date() < new Date(session.expiry)
}

export function deleteSession(sessionId: string) {
    return invalidateSession(null, sessionId)
}
