import { IsArray, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { WidgetDTO } from './widget.dto';

export class WidgetArrayDTO {
    @IsString()
    siteId!: String;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => WidgetDTO)
    components!: WidgetDTO[];
}

