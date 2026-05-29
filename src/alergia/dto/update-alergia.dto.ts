import { PartialType } from '@nestjs/mapped-types';
import { CreateAlergiaDto } from './create-alergia.dto';
import { IsString } from 'class-validator';

export class UpdateAlergiaDto extends PartialType(CreateAlergiaDto) {
    @IsString()
    tipoAlergia?: string;
}
