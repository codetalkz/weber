import { IsNotEmpty, IsNumber, IsString, IsUUID, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

export class WidgetDTO {
    @IsUUID()
    id?: string;

    @IsString()
    type!: string;

    @IsNumber()
    position!: number;

    @ValidateNested({ each: true })
    @Type(() => WidgetDTO)
    children?: WidgetDTO[];
}
