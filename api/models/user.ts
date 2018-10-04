export interface UserDb extends UserNoIdDb {
    id: number
}

export interface UserNoIdDb {
    company_id: number,
    username: string,
    password: string,
    email: string,
    first_name?: string,
    last_name?: string,
    token?: string
}

export interface UserApi {
    id: number,
    company_id: number,
    username: string,
    email: string,
    first_name?: string,
    last_name?: string,
    token?: string
}
