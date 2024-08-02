import { HttpException } from "../exceptions/http.exception";
import { NextFunction, Request, Response } from "express";
import fs from "fs"

export function errorMiddleware(error:any, req: Request, res: Response, next: NextFunction){
    let statusCode: number = error instanceof HttpException ? error.statusCode : 500;
    let message: string = error instanceof HttpException ? error.message : "Something went wrong";

    fs.appendFileSync("error.log", `${error.toString()}\n`, "utf8")

    if (error.toString().includes("Foreign key constraint failed")) {
        statusCode = 409;
        message = "Data tidak dapat dihapus karena masih terdapat data yang terkait";
    }

    res
        .status(statusCode)
        .json({
            status: "FAILED",
            message: message,
            data: null,
        })

}

export function notFoundMiddleware(req: Request, res:Response, next: NextFunction){
    next(new HttpException(404, "Endpoint tidak ditemukan"))
}


