import * as _ from 'lodash'
import * as express from 'express'
const bodyParser = require('body-parser')
const helmet = require('helmet')
const cookieParser = require('cookie-parser')
// import './controllers/authentication'; // Used for TSOA build
import './controllers/xkcd';
import * as m from './middleware'
import { RegisterRoutes } from './routes';
import { config } from './config';
import * as path from 'path'
import { ClientRoutes } from './enum';
import { getEnumValues } from './utils/typescript';

export async function boot() {
  const app = express()
  app.use(helmet())
  app.use(bodyParser.json({defaultCharset: 'utf-8'}))
  app.use(cookieParser(config.secrets.cookie))
  app.use('/docs', express.static(__dirname + '/swagger-ui'));
  app.use('/swagger.json', (req, res) => {
      res.sendFile(__dirname + '/swagger.json');
  });

  RegisterRoutes(app)
  const publicDistPath = path.join(__dirname, '..', 'client', 'dist')
  let portalRoutes = getEnumValues(ClientRoutes)
  _.each(portalRoutes, (route) => {
    app.use(route, express.static(__dirname + '/../client/dist'));
    app.get(route, (req, res) => res.sendFile(path.join(publicDistPath, 'index.html')))
  })

  // let clientRoutes = getEnumValues(ClientRoutes)
  // _.each(clientRoutes, (route) => {
  //   app.get(route, (req, res) => res.sendFile('/client/dist/index.html'))
  // })

  // Error Handler
  app.use(m.errorHandler)

  return app
}

