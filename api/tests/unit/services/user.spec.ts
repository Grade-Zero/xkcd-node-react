import { expect } from 'chai'
import { comparePasswords } from '../../../services/authentication';

describe('User units', () => {
    let app: any

    describe('password comparison', () => {
        it('successfully compares encrypted and plain text password', async () => {
            const plainText = 'password'
            const hashedPassword = '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8'
            const res = comparePasswords(plainText, hashedPassword)
            expect(res).to.eql(true)
        })
    })
})



