import { UserDb, UserApi } from '../models/user'
import { getUserById, getUsersByCompanyId, getUserByUsername } from '../db/user';
import * as _ from 'lodash'
import { invalidateSession, createSession, getSessionById } from '../db/session';
import { queryHandler } from '../db/connection';
import { PoolConnection } from 'mysql';
import { generateSession, isValidSession } from './authentication';
import { SessionType, SessionDb } from '../models/session';
import { config } from '../config';
import { isValidId } from '../utils/db_helpers';
import { NotAuthenticated } from '../utils/custom_error';
import { ClientRoutes } from '../enum';
// let SHA256 = require("crypto-js/sha256");

export async function userById(userId: number): Promise<UserApi> {
    const user = await getUserById(null, userId)
    return _.omit(user, ['password'])
}

export async function getUserListByUserId(userId: number): Promise<UserApi[]> {
    let user = await getUserById(null, userId)
    if (!user) {
        return []
    }
    return getUsersByCompanyId(null, user.company_id)
}

export async function getUserListByCompanyId(companyId: number): Promise<UserApi[]> {
    let users = await getUsersByCompanyId(null, companyId)
    return users.map((user) => {
        return _.omit(user, ['password'])
    })
}

// export async function addNewUser(userData: UserInput) {
//     let baseData = {
//         company_id: 1,
//         username: 'fakeuser',
//         password: SHA256('98fjjalsvn92hj938jlj'),
//         pin: '1234',
//         email: 'test@test.test',
//         contact_number: '12345678',
//         first_name: 'First',
//         last_name: 'Last',
//         status: UserStatus.active,
//         user_type: UserType.regular
//      }
//     let insert = { ...baseData, ...userData }
//     return queryHandler(null, async function (connection: PoolConnection) {
//         let id = await createNewUser(connection, insert)
//         const session = await generateSession(Number(id), SessionType.welcomeEmail)
//         await createSession(connection, session)
//         await sendWelcomeEmail(insert.email, session.id, insert.first_name)
//         return { ...insert, id: Number(id) }
//     })
// }
