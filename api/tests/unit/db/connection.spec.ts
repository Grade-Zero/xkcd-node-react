// import { freshDb } from '../../../utils/test_db'
// import { queryHandler, query } from '../../../db/connection'
// import { expect } from 'chai'
// import { boot } from '../../../server';
// import * as supertest from 'supertest'
// import { ScheduleEventDb, ScheduleDb } from '../../../models/schedule';

// describe('connection logic', () => {
//     let app: any

//     beforeEach(async () => {
//         await freshDb()
//     })

//     describe('query handler', () => {
//         it('reverts commits if an error occurs in the query handler', async () => {
//             const rollbackMessage = 'Throw to cause rollback'
//             try {
//                 await queryHandler(null, async (connection: any) => {
//                     const schedules = await query<ScheduleDb[]>(connection, {
//                         sql: `SELECT * FROM schedules`,
//                     })
//                     expect(schedules.length).to.eql(0)
//                     const insertData: ScheduleDb = {
//                         company_id: 1,
//                         created_on: new Date(),
//                         id: 1,
//                         name: 'test_schedule',
//                         user_id: 1,
//                     }
//                     const insertResult = await query<any[]>(connection, {
//                         sql: `INSERT INTO schedules SET ?`,
//                     }, insertData)
//                     const postInsertSchedules = await query<ScheduleDb[]>(connection, {
//                         sql: `SELECT * FROM schedules`,
//                     })
//                     expect(postInsertSchedules.length).to.eql(1)
//                     throw new Error(rollbackMessage)
//                 })
//             } catch (e) {
//                 expect(e.message).to.eql(rollbackMessage)
//                 await queryHandler(null, async (connection: any) => {
//                     const schedules = await query<ScheduleDb[]>(connection, {
//                         sql: `SELECT * FROM schedules`,
//                     })
//                     expect(schedules.length).to.eql(0)
//                 })
//             }
//         })
//     })
// })

