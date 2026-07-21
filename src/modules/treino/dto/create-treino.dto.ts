import { Type } from "class-transformer";
import { IsDate, IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { diasSemana } from "src/enums/diasSemana";

export class CreateTreinoDto {
  @IsNotEmpty({ message: 'O campo dataTreino não pode ser vazio.' })
  @Type(() => Date)
  @IsDate({ message: 'O campo dataTreino deve ser uma data válida.' })
  dataTreino: Date;

  @IsNotEmpty({ message: 'O campo descricao não pode ser vazio.' })
  @IsString({ message: 'O campo descricao deve ser uma string.' })
  descricao: string;

  @IsNotEmpty({ message: 'O campo diaTreino não pode ser vazio.' })
  @IsEnum(diasSemana, { message: 'O campo diaTreino deve ser um valor válido de dias da semana.' })
  diaTreino: diasSemana;

  @IsNotEmpty({ message: 'O campo horarioInicioTreino não pode ser vazio.' })
  @Type(() => Date)
  @IsDate({ message: 'O campo horarioInicioTreino deve ser uma data válida.' })
  horarioInicioTreino: Date;

  @IsNotEmpty({ message: 'O campo horarioFimTreino não pode ser vazio.' })
  @Type(() => Date)
  @IsDate({ message: 'O campo horarioFimTreino deve ser uma data válida.' })
  horarioFimTreino: Date;

  @IsNotEmpty({ message: 'O campo instrutorId não pode ser vazio.' })
  @IsNumber({}, { message: 'O campo instrutorId deve ser um número.' })
  instrutorId: number;

  @IsNotEmpty({ message: 'O campo turmaId não pode ser vazio.' })
  @IsNumber({}, { message: 'O campo turmaId deve ser um número.' })
  turmaId: number;

  @IsNotEmpty({ message: 'O campo localTreinoId não pode ser vazio.' })
  @IsNumber({}, { message: 'O campo localTreinoId deve ser um número.' })
  localTreinoId: number;
}
