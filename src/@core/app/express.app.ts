import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as express from 'express';
import errorMiddleware from '../middleware/error.middleware';
import ExpressController from './controller.express.app';

export class ExpressApp {
    public app: express.Application;
    public port: string | number;

    constructor(controllers: any[], port: string | number) {
        this.app = express();
        this.port = port;
        this.initializeMiddleware();
        this.initializeControllers(controllers);
        this.initializeErrorHandling();
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`App listening on the port ${this.port}`);
        });
    }

    private initializeMiddleware(): void {
        this.app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
        this.app.use(bodyParser.json({ limit: '50mb' }));
        this.app.use(bodyParser.json({ limit: '50mb', type: 'application/vnd.api+json' }));
        this.app.use(cors());
    }

    private initializeControllers(controllers: ExpressController[]): void {
        controllers.forEach((controller) => {
            this.app.use(`/${controller.path}/`, controller.router);
        });
    }

    private initializeErrorHandling(): void {
        this.app.use(errorMiddleware);
    }
}

export default ExpressApp;