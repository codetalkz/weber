import { NextFunction, Request, Response, Router } from "express";
import { WidgetService } from "../widgets/widgets.service"
import { constants, createResponse } from "../../shared/utils";
import { validationMiddleware } from "../../shared/middleware/validation.middleware";
import { WidgetArrayDTO } from "./dto/listofwidget.dto";

export class WidgetController {
    private path: string;
    private widgetService: WidgetService;
    public router: Router;

    constructor() {
        this.path = "/api/widgets";
        this.widgetService = new WidgetService();
        this.router = Router();
        this.registerRoute();
    }

    private registerRoute() {
        this.router.get(
            this.path + '/get-site',
            this.test
        )

        this.router.post(
            this.path + '/create',
            validationMiddleware(WidgetArrayDTO),
            this.updateSite
        )
    }

    private test = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const asite = await this.widgetService.getSites();

            return res
                .status(200)
                .json(
                    createResponse(
                        constants.SUCCESS_MESSAGE,
                        asite
                    )
                );
        } catch (e) {
            next(e)
        }
    }

    private updateSite = async( 
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const updatedSite = await this.widgetService.updateSite(req.body);

            return res
                .status(200)
                .json(
                    createResponse(
                        constants.SUCCESS_MESSAGE,
                        updatedSite
                    )
                );
        } catch (e) {
            console.log(e)
            next(e)
        }
    }


}
