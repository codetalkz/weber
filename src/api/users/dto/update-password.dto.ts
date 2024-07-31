import { IsNotEmpty, IsString } from "class-validator";

class updatePasswordDto {

    @IsNotEmpty()
    @IsString()
    old_password!: string;

    @IsNotEmpty()
    @IsString()
    new_password!: string;

}

export default updatePasswordDto;
