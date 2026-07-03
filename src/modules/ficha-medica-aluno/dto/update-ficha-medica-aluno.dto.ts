import { PartialType } from '@nestjs/mapped-types';
import { CreateFichaMedicaAlunoDto } from './create-ficha-medica-aluno.dto';
import { IsArray, IsNegative, IsNotEmpty, IsNumber, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { UpdateEventosMedicosDto } from 'src/modules/eventos-medicos/dto/update-eventos-medicos.dto';
import { EventosMedicos } from 'src/modules/eventos-medicos/entities/eventos-medicos.entity';

export class UpdateFichaMedicaAlunoDto extends PartialType(CreateFichaMedicaAlunoDto) {
  @IsArray({ message: 'Os eventos médicos devem ser fornecidos como uma lista de eventos médicos.' })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => UpdateEventosMedicosDto)
  eventosMedicos?: EventosMedicos[];
}
