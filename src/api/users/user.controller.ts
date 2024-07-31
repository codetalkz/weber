import { NextFunction, Request, Response, Router } from "express";
import { UserService } from "./user.service";
import { constants, createResponse } from "../../shared/utils";
import CreateUserDto from "./dto/create-user.dto";
import UpdateUserDto from "./dto/update-user.dto";
import UpdateUserProfileDto from "./dto/update-user-profile.dto";
import UpdateUserPasswordDto from "./dto/update-password.dto";
import { HttpException } from "../../shared/exceptions/http.exception";
import LoginDto from "./dto/login.dto";

export class UserController {
    private path: string;
    private userService: UserService;
    public router: Router;

    constructor() {
        this.path = "/api/users";
        this.userService = new UserService();
        this.router = Router();
        this.registerRoute();
    }

    private registerRoute() {
        this.router.post(
            this.path,
            this.createUser
        )

        this.router.post(
            this.path + "/login",
            this.test
        )

        this.router.get(
            this.path,
            this.test
        )
    }

    private test = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            return res
                .status(200)
                .json(
                    createResponse(
                        constants.SUCCESS_MESSAGE,
                        `test`
                    )
                );
        } catch (e) {
            next(e)
        }

    }

    private createUser = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        const userData: CreateUserDto = req.body;
        try {
            const newUser = await this.userService.insertNewUser(userData);

            if (newUser) {
                return res
                    .status(200)
                    .json(
                        createResponse(
                            constants.SUCCESS_MESSAGE,
                            `Successfully create new user with full name ${newUser.name}`
                        )
                    );
            }

            throw new HttpException(500, "Something went wrong");

        } catch (e) {
            next(e)
        }

    }
    //
    //
    //private login = async (req: Request, res: Response, next: NextFunction) => {
    //    const loginData: LoginDto = req.body;
    //
    //    try {
    //        const token = await this.userService.login(loginData);
    //        if (token) {
    //            return res
    //                .status(200)
    //                .json(createResponse(constants.SUCCESS_MESSAGE, { token: token }));
    //        }
    //        throw new HttpException(500, "Something went wrong");
    //    } catch (error) {
    //        next(error);
    //    }
    //};
}
