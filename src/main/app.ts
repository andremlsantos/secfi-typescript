import * as bodyParser from 'body-parser';
import { logger } from '../middleware/Logger'
import * as express from 'express';
import * as mongoose from 'mongoose';
import IController from '../controller/IUserController';

class App {
    public app: express.Application;

    constructor(controllers: IController[]) {
        this.app = express();

        this.connectToTheDatabase();
        this.initializeMiddlewares();
        this.initializeControllers(controllers);
    }

    public listen() {
        this.app.listen(process.env.PORT, () => {
            console.log(`App listening on the port ${process.env.PORT}`);
        });
    }

    private initializeMiddlewares() {
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(logger);
    }

    private initializeControllers(controllers: IController[]) {
        controllers.forEach((controller) => {
            this.app.use('/', controller.router);
        });
    }

    private connectToTheDatabase() {
        mongoose.connect(
            "mongodb+srv://" +
            process.env.MONGO_USER +
            ":" +
            process.env.MONGO_PASSWORD +
            process.env.MONGO_ATLAS_CONNECTION +
            "?retryWrites=true&w=majority",
            { useNewUrlParser: true }
        );
        // mongoose.connect(process.env.MONGO_LOCAL, { useNewUrlParser: true });
        mongoose.connection.on('open', () => {
            console.info('Connected to Mongo');
        });
        mongoose.connection.on('error', (error: any) => {
            console.error(error);
        });
    }
}

export default App;