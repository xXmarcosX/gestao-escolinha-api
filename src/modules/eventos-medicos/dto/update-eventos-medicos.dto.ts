import { PartialType } from '@nestjs/mapped-types';
import { CreateEventosMedicosDto } from './create-eventos-medicos.dto';

export class UpdateEventosMedicosDto extends PartialType(CreateEventosMedicosDto) {}
