/* tslint:disable */
import { Controller, ValidateParam, FieldErrors, ValidateError, TsoaRoute } from 'tsoa';
import { AuthenticationController } from './controllers/authentication';
import { CellarController } from './controllers/cellar';
import { WineController } from './controllers/wine';
import { UserController } from './controllers/user';
import { CompanyController } from './controllers/company';
import { BinController } from './controllers/bin';
import { WallController } from './controllers/wall';
import { AuditController } from './controllers/audit';
import { XKCDController } from './controllers/xkcd';
import { expressAuthentication } from './utils/authentication';

const models: TsoaRoute.Models = {
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
    "CellarDb": {
        "properties": {
            "id": { "dataType": "double", "required": true },
            "company_id": { "dataType": "double", "required": true },
            "name": { "dataType": "string", "required": true },
        },
    },
    "StandardResponseCellarDb[]": {
        "properties": {
            "data": { "dataType": "array", "array": { "ref": "CellarDb" }, "required": true },
            "meta": { "dataType": "any", "required": true },
        },
    },
    "WineDb": {
        "properties": {
            "company_id": { "dataType": "double", "required": true },
            "bin_id": { "dataType": "double", "required": true },
            "sku": { "dataType": "string", "required": true },
            "name": { "dataType": "string", "required": true },
            "vineyard": { "dataType": "string", "required": true },
            "color": { "dataType": "string", "required": true },
            "year": { "dataType": "object" },
            "country": { "dataType": "object" },
            "type": { "dataType": "string", "required": true },
            "cellar_until": { "dataType": "string", "required": true },
            "expiry": { "dataType": "string", "required": true },
            "rating": { "dataType": "object" },
            "purchase_cost": { "dataType": "object" },
            "retail_value": { "dataType": "object" },
            "coordinate": { "dataType": "string", "required": true },
            "coordinate_x": { "dataType": "string", "required": true },
            "coordinate_y": { "dataType": "string", "required": true },
            "added_on": { "dataType": "object" },
            "archived": { "dataType": "object" },
            "id": { "dataType": "double", "required": true },
        },
    },
    "StandardResponseWineDb[]": {
        "properties": {
            "data": { "dataType": "array", "array": { "ref": "WineDb" }, "required": true },
            "meta": { "dataType": "any", "required": true },
        },
    },
    "WineNoIdDb": {
        "properties": {
            "company_id": { "dataType": "double", "required": true },
            "bin_id": { "dataType": "double", "required": true },
            "sku": { "dataType": "string", "required": true },
            "name": { "dataType": "string", "required": true },
            "vineyard": { "dataType": "string", "required": true },
            "color": { "dataType": "string", "required": true },
            "year": { "dataType": "object" },
            "country": { "dataType": "object" },
            "type": { "dataType": "string", "required": true },
            "cellar_until": { "dataType": "string", "required": true },
            "expiry": { "dataType": "string", "required": true },
            "rating": { "dataType": "object" },
            "purchase_cost": { "dataType": "object" },
            "retail_value": { "dataType": "object" },
            "coordinate": { "dataType": "string", "required": true },
            "coordinate_x": { "dataType": "string", "required": true },
            "coordinate_y": { "dataType": "string", "required": true },
            "added_on": { "dataType": "object" },
            "archived": { "dataType": "object" },
        },
    },
    "ChangeStatusResponse": {
        "properties": {
            "success": { "dataType": "boolean", "required": true },
        },
    },
    "StandardResponseChangeStatusResponse": {
        "properties": {
            "data": { "ref": "ChangeStatusResponse", "required": true },
            "meta": { "dataType": "any", "required": true },
        },
    },
    "WineMove": {
        "properties": {
            "insert": { "dataType": "array", "array": { "ref": "WineNoIdDb" }, "required": true },
            "remove": { "dataType": "array", "array": { "ref": "WineDb" }, "required": true },
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
    "CompanyType": {
        "enums": ["regular"],
    },
    "CompanyDb": {
        "properties": {
            "id": { "dataType": "double", "required": true },
            "company_type": { "dataType": "string", "required": true },
            "name": { "dataType": "string", "required": true },
            "contact_user_id": { "ref": "CompanyType", "required": true },
        },
    },
    "StandardResponseCompanyDb": {
        "properties": {
            "data": { "ref": "CompanyDb", "required": true },
            "meta": { "dataType": "any", "required": true },
        },
    },
    "BottlePosition": {
        "properties": {
            "coordinate_x": { "dataType": "string", "required": true },
            "coordinate_y": { "dataType": "string", "required": true },
            "available": { "dataType": "boolean", "required": true },
        },
    },
    "Bin": {
        "properties": {
            "id": { "dataType": "double", "required": true },
            "company_id": { "dataType": "double", "required": true },
            "wall_id": { "dataType": "double", "required": true },
            "name": { "dataType": "string", "required": true },
            "type": { "dataType": "double", "required": true },
            "bin_type": { "dataType": "object", "required": true },
            "coordinate_x": { "dataType": "string", "required": true },
            "coordinate_y": { "dataType": "string", "required": true },
            "bottles": { "dataType": "array", "array": { "ref": "WineDb" }, "required": true },
            "available_positions": { "dataType": "array", "array": { "ref": "BottlePosition" }, "required": true },
            "taken_positions": { "dataType": "array", "array": { "ref": "BottlePosition" }, "required": true },
            "active": { "dataType": "boolean", "required": true },
        },
    },
    "StandardResponseBin[]": {
        "properties": {
            "data": { "dataType": "array", "array": { "ref": "Bin" }, "required": true },
            "meta": { "dataType": "any", "required": true },
        },
    },
    "BinType": {
        "properties": {
            "id": { "dataType": "double", "required": true },
            "type_name": { "dataType": "string", "required": true },
            "capacity": { "dataType": "double", "required": true },
        },
    },
    "StandardResponseBinType[]": {
        "properties": {
            "data": { "dataType": "array", "array": { "ref": "BinType" }, "required": true },
            "meta": { "dataType": "any", "required": true },
        },
    },
    "BinDb": {
        "properties": {
            "id": { "dataType": "double", "required": true },
            "company_id": { "dataType": "double", "required": true },
            "wall_id": { "dataType": "double", "required": true },
            "name": { "dataType": "string", "required": true },
            "type": { "dataType": "double", "required": true },
            "bin_type": { "dataType": "object", "required": true },
            "coordinate_x": { "dataType": "string", "required": true },
            "coordinate_y": { "dataType": "string", "required": true },
            "bottles": { "dataType": "array", "array": { "ref": "WineDb" }, "required": true },
        },
    },
    "StandardResponseBinDb": {
        "properties": {
            "data": { "ref": "BinDb", "required": true },
            "meta": { "dataType": "any", "required": true },
        },
    },
    "Wall": {
        "properties": {
            "id": { "dataType": "double", "required": true },
            "company_id": { "dataType": "double", "required": true },
            "cellar_id": { "dataType": "double", "required": true },
            "name": { "dataType": "string", "required": true },
            "coorindate_x": { "dataType": "string", "required": true },
            "coordinate_y": { "dataType": "string", "required": true },
            "bins": { "dataType": "array", "array": { "ref": "Bin" }, "required": true },
            "active": { "dataType": "boolean", "required": true },
        },
    },
    "StandardResponseWall[]": {
        "properties": {
            "data": { "dataType": "array", "array": { "ref": "Wall" }, "required": true },
            "meta": { "dataType": "any", "required": true },
        },
    },
    "StandardResponseboolean": {
        "properties": {
            "data": { "dataType": "boolean", "required": true },
            "meta": { "dataType": "any", "required": true },
        },
    },
    "AuditAction": {
        "enums": ["archive", "move"],
    },
    "AuditNoIdDb": {
        "properties": {
            "company_id": { "dataType": "double", "required": true },
            "action": { "ref": "AuditAction", "required": true },
            "payload": { "dataType": "string", "required": true },
        },
    },
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
};

export function RegisterRoutes(app: any) {
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
        authenticateMiddleware([{ "name": "cellar_session" }]),
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
    app.get('/v1/cellar/cellar/by_userid/:userId',
        authenticateMiddleware([{ "name": "cellar_session" }]),
        function(request: any, response: any, next: any) {
            const args = {
                request: { "in": "request", "name": "request", "required": true, "dataType": "object" },
                userId: { "in": "path", "name": "userId", "required": true, "dataType": "double" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new CellarController();


            const promise = controller.List.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, next);
        });
    app.get('/v1/wine/wine',
        authenticateMiddleware([{ "name": "cellar_session" }]),
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

            const controller = new WineController();


            const promise = controller.Wine.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, next);
        });
    app.get('/v1/wine/wine_by_bin',
        authenticateMiddleware([{ "name": "cellar_session" }]),
        function(request: any, response: any, next: any) {
            const args = {
                binId: { "in": "query", "name": "binId", "required": true, "dataType": "double" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new WineController();


            const promise = controller.WineByBin.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, next);
        });
    app.post('/v1/wine/wines',
        authenticateMiddleware([{ "name": "cellar_session" }]),
        function(request: any, response: any, next: any) {
            const args = {
                formData: { "in": "body", "name": "formData", "required": true, "dataType": "array", "array": { "ref": "WineNoIdDb" } },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new WineController();


            const promise = controller.DataArray.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, next);
        });
    app.get('/v1/wine/list/by_userid/:userId',
        authenticateMiddleware([{ "name": "cellar_session" }]),
        function(request: any, response: any, next: any) {
            const args = {
                request: { "in": "request", "name": "request", "required": true, "dataType": "object" },
                userId: { "in": "path", "name": "userId", "required": true, "dataType": "double" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new WineController();


            const promise = controller.List.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, next);
        });
    app.post('/v1/wine/delete',
        authenticateMiddleware([{ "name": "cellar_session" }]),
        function(request: any, response: any, next: any) {
            const args = {
                bottlesToDelete: { "in": "body", "name": "bottlesToDelete", "required": true, "dataType": "array", "array": { "ref": "WineDb" } },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new WineController();


            const promise = controller.DeleteWine.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, next);
        });
    app.post('/v1/wine/update',
        authenticateMiddleware([{ "name": "cellar_session" }]),
        function(request: any, response: any, next: any) {
            const args = {
                request: { "in": "request", "name": "request", "required": true, "dataType": "object" },
                body: { "in": "body", "name": "body", "required": true, "ref": "WineMove" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new WineController();


            const promise = controller.UpdateWine.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, next);
        });
    app.post('/v1/wine/archive',
        authenticateMiddleware([{ "name": "cellar_session" }]),
        function(request: any, response: any, next: any) {
            const args = {
                request: { "in": "request", "name": "request", "required": true, "dataType": "object" },
                body: { "in": "body", "name": "body", "required": true, "dataType": "array", "array": { "ref": "WineDb" } },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new WineController();


            const promise = controller.ArchiveWine.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, next);
        });
    app.get('/v1/user/active',
        authenticateMiddleware([{ "name": "cellar_session" }]),
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
        authenticateMiddleware([{ "name": "cellar_session" }]),
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
    app.get('/v1/company/:id',
        authenticateMiddleware([{ "name": "cellar_session" }]),
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

            const controller = new CompanyController();


            const promise = controller.ById.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, next);
        });
    app.get('/v1/bin/bins',
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

            const controller = new BinController();


            const promise = controller.Bins.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, next);
        });
    app.get('/v1/bin/bin_types',
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

            const controller = new BinController();


            const promise = controller.BinTypes.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, next);
        });
    app.get('/v1/bin/list/by_userid/:userId',
        authenticateMiddleware([{ "name": "cellar_session" }]),
        function(request: any, response: any, next: any) {
            const args = {
                request: { "in": "request", "name": "request", "required": true, "dataType": "object" },
                userId: { "in": "path", "name": "userId", "required": true, "dataType": "double" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new BinController();


            const promise = controller.List.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, next);
        });
    app.post('/v1/bin/update',
        authenticateMiddleware([{ "name": "cellar_session" }]),
        function(request: any, response: any, next: any) {
            const args = {
                request: { "in": "request", "name": "request", "required": true, "dataType": "object" },
                body: { "in": "body", "name": "body", "required": true, "ref": "BinDb" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new BinController();


            const promise = controller.Update.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, next);
        });
    app.get('/v1/wall/walls',
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

            const controller = new WallController();


            const promise = controller.Walls.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, next);
        });
    app.get('/v1/wall/list/by_cellarid/:cellarId',
        authenticateMiddleware([{ "name": "cellar_session" }]),
        function(request: any, response: any, next: any) {
            const args = {
                request: { "in": "request", "name": "request", "required": true, "dataType": "object" },
                cellarId: { "in": "path", "name": "cellarId", "required": true, "dataType": "double" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new WallController();


            const promise = controller.ByCellar.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, next);
        });
    app.get('/v1/wall/list/by_userid/:userId',
        authenticateMiddleware([{ "name": "cellar_session" }]),
        function(request: any, response: any, next: any) {
            const args = {
                request: { "in": "request", "name": "request", "required": true, "dataType": "object" },
                userId: { "in": "path", "name": "userId", "required": true, "dataType": "double" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new WallController();


            const promise = controller.ByUser.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, next);
        });
    app.post('/v1/audit/audit',
        authenticateMiddleware([{ "name": "cellar_session" }]),
        function(request: any, response: any, next: any) {
            const args = {
                request: { "in": "request", "name": "request", "required": true, "dataType": "object" },
                body: { "in": "body", "name": "body", "required": true, "dataType": "array", "array": { "ref": "AuditNoIdDb" } },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new AuditController();


            const promise = controller.PostAudit.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, next);
        });
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
