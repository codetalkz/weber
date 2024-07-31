import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    full_name!: string;

    @IsString()
    @MinLength(6)
    @IsNotEmpty()
    password!: string;

    @IsEmail()
    @IsNotEmpty()
    email!: string;
}

export default CreateUserDto;
