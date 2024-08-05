import { OnClickType } from "@prisma/client";
import { IsEnum, IsString } from "class-validator";

export class OnClickDTO {
    @IsEnum(OnClickType)
    type!: OnClickType;

    @IsString()
    target!: string;

    @IsString()
    value!: string;
}
