import 'reflect-metadata'
import express, { Application } from "express";
import cors from "cors"
import { WidgetController } from "./api/widgets/widgets.controller";
import { errorMiddleware, notFoundMiddleware } from './shared/middleware/error.middleware';

class Server {
    private app: Application;

    constructor() {
        this.app = express();
        this.registerMiddlewares();
        this.routes();
        //this.utils();
        //this.registerStaticFiles();
        this.registerErrorMiddlewares();
    }

    private registerMiddlewares() {
        this.app.use(express.json());
        this.app.use(cors({
            origin: "*",
            methods: ["GET", "POST", "PUT", "DELETE"],
            allowedHeaders: ["Content-Type", "Authorization"]
        }));
    }

    private registerErrorMiddlewares() {
        this.app.use(notFoundMiddleware);
        this.app.use(errorMiddleware);
    }

    //
    //private registerStaticFiles() {
    //    this.app.use("/api/images", express.static("public"));
    //}
    //
    //private utils() {
    //    scoresRubric();
    //}

    private routes() {
        this.app.use(new WidgetController().router);
    }

    public run() {
        this.app.listen(3000, () => {
            console.log(`Server is listening on port 3000`);
        });
    }
}

const server = new Server();
server.run();

