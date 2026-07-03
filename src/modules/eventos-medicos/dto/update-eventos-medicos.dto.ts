import { PartialType } from '@nestjs/mapped-types';
import { CreateEventosMedicosDto } from './create-eventos-medicos.dto';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateEventosMedicosDto extends PartialType(CreateEventosMedicosDto) {
  @IsNotEmpty()
  @IsNumber()
  id?: number;
}
