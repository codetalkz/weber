"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const widgets_controller_1 = require("../src/api/widgets/widgets.controller");
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.registerMiddlewares();
        this.routes();
        //this.utils();
        //this.registerStaticFiles();
        //this.registerErrorMiddlewares();
    }
    registerMiddlewares() {
        this.app.use(express_1.default.json());
        this.app.use((0, cors_1.default)());
    }
    //private registerErrorMiddlewares() {
    //    this.app.use(notFoundMiddleware);
    //    this.app.use(errorMiddleware);
    //}
    //
    //private registerStaticFiles() {
    //    this.app.use("/api/images", express.static("public"));
    //}
    //
    //private utils() {
    //    scoresRubric();
    //}
    routes() {
        this.app.use(new widgets_controller_1.WidgetController().router);
    }
    run() {
        this.app.listen(3000, () => {
            console.log(`Server is listening on port 3000`);
        });
    }
}
const server = new Server();
server.run();
