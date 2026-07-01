import { Type } from "class-transformer";
import { IsArray, IsEnum, IsNotEmpty, IsNumber, IsOptional, ValidateNested } from "class-validator";
import { TipoSanguineo } from "src/enums/tipo-sanguineo.enum";
import { CreateEventosMedicosDto } from "src/modules/eventos-medicos/dto/create-eventos-medicos.dto";
import { EventosMedicos } from "src/modules/eventos-medicos/entities/eventos-medicos.entity";

export class CreateFichaMedicaAlunoDto {
  @IsNotEmpty({ message: 'O tipo sanguíneo é obrigatório.' })
  @IsEnum(TipoSanguineo, { message: 'Tipo sanguíneo informado é inválido.' })
  tipoSanguineo: TipoSanguineo;

  @IsArray({ message: 'As alergias devem ser fornecidas como uma lista de IDs.' })
  @IsNumber({}, { each: true, message: 'Cada ID de alergia deve ser um número válido.' })
  @IsOptional()
  alergiasIds?: number[];

  @IsArray({ message: 'Os eventos médicos devem ser fornecidos como uma lista de eventos médicos.' })
  @IsOptional()
  @ValidateNested({ each: true }) 
  @Type(() => CreateEventosMedicosDto)
  eventosMedicos: EventosMedicos[];
}

