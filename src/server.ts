
import * as apm from 'elastic-apm-node';
import { once } from 'events';
import * as express from 'express';
import * as helmet from 'helmet';
import * as http from 'http';
import * as logger from 'morgan';
import { apmConfig } from './config';
import { getByID, searchByName } from './user/user.controller';
import { ResourceNotFoundError } from './utils/errors/client.error';
import { wrapAsync } from './utils/wrappers';

export default class Server {
  private app: express.Application;
  private http: http.Server | undefined;
  private port: string;

  constructor(port: string) {
    this.port = port;
    this.app = express();

    this.configureAPM();
    this.configureMiddlewares();
    this.configureApiRoutes();
    this.configureErrorHandlers();
  }

  private configureMiddlewares() {
    this.app.use(logger('tiny'));
    this.app.use(helmet());
  }

  private configureAPM() {
    apm.start({
      serviceName: 'user-service',
      secretToken: apmConfig.secretToken,
      serverUrl: apmConfig.serverUrl,
      active: apmConfig.isActive === 'true',
    });
  }

  private configureApiRoutes() {
    // Is Alive
    this.app.get('/isAlive', (req, res) => {
      res.status(200).send('alive');
    });
    // Get user by ID
    this.app.get('/:id', wrapAsync(getByID));
    // Search by partial name
    this.app.get('/', wrapAsync(searchByName));
  }

  // configureErrorHandlers
  private configureErrorHandlers() {
    /* handle all non-existing routes - without logging */
    this.app.all('*', (req, res) => {
      const err = new ResourceNotFoundError(`Route: ${req.originalUrl} not found`);
      return res.status(err.status).json({
        message: err.message,
        name: err.name,
      });
    });
  }

  public async start() {
    console.log(`About to listen with port: ${this.port}`);
    this.http = this.app.listen(this.port);
    await once(this.http, 'listening');
  }
}
