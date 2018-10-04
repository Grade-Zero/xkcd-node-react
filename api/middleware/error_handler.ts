import { ApplicationError } from '../utils/custom_error'
import { ValidateError } from 'tsoa';

export function errorHandler (err: ApplicationError | ValidateError, req: any, res: any, next: Function) {
    let message = err.message || 'An unexpected error occured, we are looking into it.'
    if (!err.message && err instanceof ValidateError) {
        message = 'Invalid request made'
    }
    const status = err.status || 500
    const name = err.name
    const fields = (err as ValidateError).fields
    return res.status(status).json({
        name: name,
        message: message,
        status: status,
        fields: fields
    })
}
