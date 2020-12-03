
import * as logger from 'morgan';
import * as express from 'express';
import * as http from 'http';
import * as helmet from 'helmet';
import * as bodyParser from 'body-parser';
import { once } from 'events';
import { ResourceNotFoundError } from './utils/errors/client.error';
import appRouter from './router';

export default class Server {
  private app: express.Application;
  private http: http.Server | undefined;
  private port: string;

  constructor(port: string) {
    this.port = port;
    this.app = express();

    this.configureMiddlewares();
    this.configureApiRoutes();
    this.configureErrorHandlers();
  }

  private configureMiddlewares() {
    this.app.use(logger('tiny'));
    this.app.use(helmet());
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
  }

  private configureApiRoutes() {
    this.app.use(appRouter);
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
