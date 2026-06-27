import { PartialType } from '@nestjs/mapped-types';
import { CreateTipoEventoMedicoDto } from './create-tipo-evento-medico.dto';

export class UpdateTipoEventoMedicoDto extends PartialType(CreateTipoEventoMedicoDto) {}
