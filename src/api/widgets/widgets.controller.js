"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WidgetController = void 0;
const express_1 = require("express");
const widgets_service_1 = require("../widgets/widgets.service");
const utils_1 = require("../../shared/utils");
class WidgetController {
    constructor() {
        this.test = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const asite = yield this.widgetService.getSites();
                return res
                    .status(200)
                    .json((0, utils_1.createResponse)(utils_1.constants.SUCCESS_MESSAGE, asite));
            }
            catch (e) {
                next(e);
            }
        });
        this.path = "/api/widgets";
        this.widgetService = new widgets_service_1.WidgetService();
        this.router = (0, express_1.Router)();
        this.registerRoute();
    }
    registerRoute() {
        this.router.get(this.path + '/testing', this.test);
    }
}
exports.WidgetController = WidgetController;
