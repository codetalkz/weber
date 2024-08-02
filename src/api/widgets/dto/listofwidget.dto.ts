import { IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { WidgetDTO } from './widget.dto';

export class WidgetArrayDTO {
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => WidgetDTO)
    data!: WidgetDTO[];
}

