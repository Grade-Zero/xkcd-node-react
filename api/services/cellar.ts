import { getUserById } from '../db/user'
import { CellarDb } from '../models/cellar'
import { getCellarByCompanyId } from '../db/cellar';


export async function getCellarByUserId(userId: number): Promise<CellarDb[]> {
    let user = await getUserById(null, userId)
    if (!user) {
        return []
    }
    return getCellarByCompanyId(null, user.company_id)
}
