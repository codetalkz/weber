import { PrismaClient } from "@prisma/client";
import CreateUserDto from "./dto/create-user.dto";
import LoginDto from "./dto/login.dto";
import { HttpException } from "../../shared/exceptions/http.exception";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

export class UserService { private db: PrismaClient;
    constructor() {
        this.db = new PrismaClient();
    }

    async insertNewUser(user: CreateUserDto) {
        try {
            const existingUser = await this.db.user.findUnique({
                where: {
                    email: user.email
                }
            })

            if (existingUser) {
                throw new HttpException(400, "User already exist");
            }

            const hashedPassword = await this.hashPassword(user.password);

            const newUser = await this.db.user.create({
                data: {
                    password: hashedPassword,
                    email: user.email,
                    name: user.full_name,
                }
            })

            return newUser;
        } catch (error) {
            throw error;
        }
    }
    //
    //async login(loginData: LoginDto) {
    //    const user = await this.db.user.findUnique({
    //        where: {
    //            email: loginData.email,
    //        },
    //    });
    //
    //    if (!user) {
    //        throw new HttpException(404, "User not found");
    //    }
    //
    //    const isPasswordCorrect = await this.comparePassword(
    //        loginData.password,
    //        user.password
    //    );
    //
    //    if (!isPasswordCorrect) {
    //        throw new HttpException(404, "User not found");
    //    }
    //
    //    return this.createJwtToken(user.id);
    //}
    //
    private hashPassword(plainPassword: string) {
        return bcrypt.hash(plainPassword, 10);
    }
    //
    //private comparePassword(plainPassword: string, hashedPassword: string) {
    //    return bcrypt.compare(plainPassword, hashedPassword);
    //}
    //
    //private createJwtToken(userId: string) {
    //    const jwtKey = process.env.JWT_KEY;
    //    if (!jwtKey) {
    //        throw new HttpException(500, "JWT_KEY env not found");
    //    }
    //    return jwt.sign({ userId }, jwtKey, {
    //        expiresIn: "14d",
    //    });
    //}
}
