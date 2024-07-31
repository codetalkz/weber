import { NextFunction, Request, Response, Router } from "express";
import { WidgetService } from "../widgets/widgets.service"
import { constants, createResponse } from "../../shared/utils";

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
            this.path + '/testing',
            this.test
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



}
