/* tslint:disable */
import { Controller, ValidateParam, FieldErrors, ValidateError, TsoaRoute } from 'tsoa';
import { XKCDController } from './controllers/xkcd';
import { AuthenticationController } from './controllers/authentication';
import { UserController } from './controllers/user';
import { expressAuthentication } from './utils/authentication';

const models: TsoaRoute.Models = {
    "Comic": {
        "properties": {
            "title": { "dataType": "string", "required": true },
            "url": { "dataType": "string", "required": true },
        },
    },
    "StandardResponseComic[]": {
        "properties": {
            "data": { "dataType": "array", "array": { "ref": "Comic" }, "required": true },
            "meta": { "dataType": "any", "required": true },
        },
    },
    "ComicDb": {
        "properties": {
            "title": { "dataType": "string", "required": true },
            "url": { "dataType": "string", "required": true },
            "id": { "dataType": "double", "required": true },
        },
    },
    "StandardResponseComicDb[]": {
        "properties": {
            "data": { "dataType": "array", "array": { "ref": "ComicDb" }, "required": true },
            "meta": { "dataType": "any", "required": true },
        },
    },
    "StandardResponseComicDb": {
        "properties": {
            "data": { "ref": "ComicDb", "required": true },
            "meta": { "dataType": "any", "required": true },
        },
    },
    "StandardResponseboolean": {
        "properties": {
            "data": { "dataType": "boolean", "required": true },
            "meta": { "dataType": "any", "required": true },
        },
    },
    "LoginResApi": {
        "properties": {
            "username": { "dataType": "string", "required": true },
            "sessionId": { "dataType": "string", "required": true },
        },
    },
    "StandardResponseLoginResApi": {
        "properties": {
            "data": { "ref": "LoginResApi", "required": true },
            "meta": { "dataType": "any", "required": true },
        },
    },
    "LoginReqApi": {
        "properties": {
            "username": { "dataType": "string", "required": true },
            "password": { "dataType": "string", "required": true },
        },
    },
    "LogoutResApi": {
        "properties": {
            "success": { "dataType": "boolean", "required": true },
        },
    },
    "StandardResponseLogoutResApi": {
        "properties": {
            "data": { "ref": "LogoutResApi", "required": true },
            "meta": { "dataType": "any", "required": true },
        },
    },
    "UserApi": {
        "properties": {
            "id": { "dataType": "double", "required": true },
            "company_id": { "dataType": "double", "required": true },
            "username": { "dataType": "string", "required": true },
            "email": { "dataType": "string", "required": true },
            "first_name": { "dataType": "string" },
            "last_name": { "dataType": "string" },
            "token": { "dataType": "string" },
        },
    },
    "StandardResponseUserApi": {
        "properties": {
            "data": { "ref": "UserApi", "required": true },
            "meta": { "dataType": "any", "required": true },
        },
    },
    "StandardResponseUserApi[]": {
        "properties": {
            "data": { "dataType": "array", "array": { "ref": "UserApi" }, "required": true },
            "meta": { "dataType": "any", "required": true },
        },
    },
};

export function RegisterRoutes(app: any) {
    app.get('/v1/xkcd/comics',
        function(request: any, response: any, next: any) {
            const args = {
                limit: { "in": "query", "name": "limit", "dataType": "double" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new XKCDController();


            const promise = controller.Walls.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, next);
        });
    app.get('/v1/xkcd/dbComics',
        function(request: any, response: any, next: any) {
            const args = {
                limit: { "in": "query", "name": "limit", "dataType": "double" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new XKCDController();


            const promise = controller.Comics.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, next);
        });
    app.get('/v1/xkcd/fetch',
        function(request: any, response: any, next: any) {
            const args = {
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new XKCDController();


            const promise = controller.FetchComics.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, next);
        });
    app.get('/v1/xkcd/fetchByid/:id',
        function(request: any, response: any, next: any) {
            const args = {
                request: { "in": "request", "name": "request", "required": true, "dataType": "object" },
                id: { "in": "path", "name": "id", "required": true, "dataType": "double" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new XKCDController();


            const promise = controller.FetchComicById.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, next);
        });
    app.post('/v1/xkcd/comic',
        function(request: any, response: any, next: any) {
            const args = {
                request: { "in": "request", "name": "request", "required": true, "dataType": "object" },
                body: { "in": "body", "name": "body", "required": true, "ref": "Comic" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new XKCDController();


            const promise = controller.InsertComic.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, next);
        });
    app.post('/v1/authentication/login',
        function(request: any, response: any, next: any) {
            const args = {
                body: { "in": "body", "name": "body", "required": true, "ref": "LoginReqApi" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new AuthenticationController();


            const promise = controller.Login.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, next);
        });
    app.get('/v1/authentication/valid_session',
        authenticateMiddleware([{ "name": "xkcd_session" }]),
        function(request: any, response: any, next: any) {
            const args = {
                request: { "in": "request", "name": "request", "required": true, "dataType": "object" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new AuthenticationController();


            const promise = controller.ValidSession.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, next);
        });
    app.post('/v1/authentication/logout',
        function(request: any, response: any, next: any) {
            const args = {
                request: { "in": "request", "name": "request", "required": true, "dataType": "object" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new AuthenticationController();


            const promise = controller.Logout.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, next);
        });
    app.get('/v1/user/active',
        authenticateMiddleware([{ "name": "xkcd_session" }]),
        function(request: any, response: any, next: any) {
            const args = {
                request: { "in": "request", "name": "request", "required": true, "dataType": "object" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new UserController();


            const promise = controller.ById.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, next);
        });
    app.get('/v1/user/list/by_companyid/:companyId',
        authenticateMiddleware([{ "name": "xkcd_session" }]),
        function(request: any, response: any, next: any) {
            const args = {
                request: { "in": "request", "name": "request", "required": true, "dataType": "object" },
                companyId: { "in": "path", "name": "companyId", "required": true, "dataType": "double" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new UserController();


            const promise = controller.UserList.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, next);
        });

    function authenticateMiddleware(security: TsoaRoute.Security[] = []) {
        return (request: any, response: any, next: any) => {
            let responded = 0;
            let success = false;
            for (const secMethod of security) {
                expressAuthentication(request, secMethod.name, secMethod.scopes).then((user: any) => {
                    // only need to respond once
                    if (!success) {
                        success = true;
                        responded++;
                        request['user'] = user;
                        next();
                    }
                })
                    .catch((error: any) => {
                        responded++;
                        if (responded == security.length && !success) {
                            response.status(401);
                            next(error)
                        }
                    })
            }
        }
    }

    function isController(object: any): object is Controller {
        return 'getHeaders' in object && 'getStatus' in object && 'setStatus' in object;
    }

    function promiseHandler(controllerObj: any, promise: any, response: any, next: any) {
        return Promise.resolve(promise)
            .then((data: any) => {
                let statusCode;
                if (isController(controllerObj)) {
                    const headers = controllerObj.getHeaders();
                    Object.keys(headers).forEach((name: string) => {
                        response.set(name, headers[name]);
                    });

                    statusCode = controllerObj.getStatus();
                }

                if (data || data === false) { // === false allows boolean result
                    response.status(statusCode || 200).json(data);
                } else {
                    response.status(statusCode || 204).end();
                }
            })
            .catch((error: any) => next(error));
    }

    function getValidatedArgs(args: any, request: any): any[] {
        const fieldErrors: FieldErrors = {};
        const values = Object.keys(args).map((key) => {
            const name = args[key].name;
            switch (args[key].in) {
                case 'request':
                    return request;
                case 'query':
                    return ValidateParam(args[key], request.query[name], models, name, fieldErrors);
                case 'path':
                    return ValidateParam(args[key], request.params[name], models, name, fieldErrors);
                case 'header':
                    return ValidateParam(args[key], request.header(name), models, name, fieldErrors);
                case 'body':
                    return ValidateParam(args[key], request.body, models, name, fieldErrors, name + '.');
                case 'body-prop':
                    return ValidateParam(args[key], request.body[name], models, name, fieldErrors, 'body.');
            }
        });
        if (Object.keys(fieldErrors).length > 0) {
            throw new ValidateError(fieldErrors, '');
        }
        return values;
    }
}
