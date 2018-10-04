export interface LoginReqApi {
    username: string,
    password: string
}

export interface LoginResApi {
    username: string,
    sessionId: string
}

export interface LogoutResApi {
    success: boolean
}
