import { IsNumber, IsOptional, IsString, IsUUID, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { OnClickDTO } from "./onclick.dto";

export class WidgetDTO {
    @IsUUID()
    @IsOptional()
    id?: string;

    @IsString()
    type!: string;

    @IsNumber()
    position!: number;

    @IsString()
    @IsOptional()
    variant?: string;

    @IsString()
    @IsOptional()
    value?: string;

    @Type(() => OnClickDTO)
    @IsOptional()
    onClick?: OnClickDTO;

    @ValidateNested({ each: true })
    @Type(() => WidgetDTO)
    @IsOptional()
    children?: WidgetDTO[];
}
