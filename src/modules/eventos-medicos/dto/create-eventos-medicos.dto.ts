import { Type } from "class-transformer";
import { IsArray, IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateEventosMedicosDto {
  @Type(() => Date)
  @IsDate({ message: 'O campo data do evento deve ser uma data válida' })
  @IsNotEmpty({ message: 'O campo data do evento deve estar preenchido' })
  dataEvento: Date;

  @IsString({ message: 'O campo local nome deve estar preenchido' })
  @IsNotEmpty({ message: 'O campo local nome deve estar preenchido' })
  descricaoEvento: string;

  @IsNumber({}, { each: true })
  @IsOptional()
  tipoEventoMedico: number;
}