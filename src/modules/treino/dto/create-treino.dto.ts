import { Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateTreinoDto {
  @IsNotEmpty({ message: 'O campo dataTreino não pode ser vazio.' })
  @Type(() => Date)
  @IsDate({ message: 'O campo dataTreino deve ser uma data válida.' })
  dataTreino: Date;

  @IsNotEmpty({ message: 'O campo descricao não pode ser vazio.' })
  @IsString({ message: 'O campo descricao deve ser uma string.' })
  descricao: string;

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
