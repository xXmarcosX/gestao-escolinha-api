import { PartialType } from '@nestjs/mapped-types';
import { CreateAlergiaDto } from './create-alergia.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateAlergiaDto extends PartialType(CreateAlergiaDto) {
    @IsString()
    @IsNotEmpty()
    tipoAlergia?: string
}
