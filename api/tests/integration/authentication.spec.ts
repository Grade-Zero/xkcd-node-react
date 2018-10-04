import { freshDb, validateResponse } from '../../utils/test_db'
import { queryHandler, query } from '../../db/connection'
import { expect } from 'chai'
import { boot } from '../../server';
import * as supertest from 'supertest'
import { UserDb } from '../../models/user';

describe('Authentication endpoints', () => {
    let app: any

    before(async () => {
        app = await boot()
    })

    beforeEach(async () => {
        await freshDb()
        await insertTestData()
    })

    it('login endpoint', (done) => {
        supertest(app)
            .post('/v1/authentication/login')
            .send({
                email: 'test@test.com',
                password: 'password'
            })
            .set('Accept', 'application/json')
            .expect(200)
            .end((err, res) => {
                validateResponse(err, res, done, async () => {
                    expect(res.body.data.username).to.eql('test@test.com')
                    let sessions = await queryHandler(null, async (connection: any) => {
                        return query<any[]>(connection, {
                            sql: `SELECT * FROM sessions`,
                        })
                    })
                    expect(sessions.length).to.eql(1)
                    expect(sessions[0].id).to.eql(res.body.data.sessionId)
                })
            });
    })

})

async function insertTestData() {

    const userData: UserDb = {
        id: 1,
        company_id: 1,
        username: 'joel',
        password: '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8', // hashed sha256 "password"
        email: 'joel'
    }

    await queryHandler(null, async (connection: any) => {
        const user = await query<any[]>(connection, {
            sql: `INSERT INTO users SET ?`,
        }, userData)
    })
}
