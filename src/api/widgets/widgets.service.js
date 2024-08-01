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
exports.WidgetService = void 0;
const client_1 = require("@prisma/client");
class WidgetService {
    constructor() {
        this.db = new client_1.PrismaClient();
    }
    getSites() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const site = yield this.db.site.findFirst({
                    where: {
                        domain: 'domain.com'
                    },
                    select: {
                        widgets: {
                            where: {
                                children: {
                                    some: {}
                                }
                            },
                            select: {
                                id: true,
                                type: true,
                                position: true,
                                variant: true,
                                value: true,
                                children: true,
                            }
                        }
                    }
                });
                return site;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.WidgetService = WidgetService;
