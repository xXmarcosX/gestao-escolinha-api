import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateTurmaDto {
  @IsString({ message: 'O nome da turma deve ser uma string válida.' })
  @IsNotEmpty({ message: 'O nome da turma não pode estar vazio.' })
  nomeTurma: string;

  @IsNumber({}, { message: 'O ID do instrutor deve ser um número.' })
  @IsNotEmpty({ message: 'O ID do instrutor não pode estar vazio.' })
  instrutorId: number;
}
