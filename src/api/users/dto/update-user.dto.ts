import { Role } from "@prisma/client";
import { IsEmail, IsString, IsInt, IsEnum, IsNotEmpty, IsOptional, minLength, MinLength, IsUUID, IsBoolean } from "class-validator";

class UpdateUserDto {
    @IsString()
    @IsNotEmpty()
    user_number!: string;

    @IsString()
    @IsNotEmpty()
    full_name!: string;

    @IsString()
    @MinLength(6)
    @IsOptional()
    password!: string;

    @IsEmail()
    @IsNotEmpty()
    email!: string;

    @IsEnum(Role)
    @IsNotEmpty()
    role!: Role;

    @IsBoolean()
    @IsNotEmpty()
    enable!: boolean;

    @IsString()
    @IsNotEmpty()
    gender!: string;
}

export default UpdateUserDto;
