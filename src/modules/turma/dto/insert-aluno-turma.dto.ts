import { IsArray, IsNotEmpty, IsNumber } from "class-validator";

export class InsertAlunoTurmaDto {
  @IsArray({ message: 'O campo de IDs de alunos deve ser um array.' })
  @IsNumber({}, { each: true, message: 'Cada ID de aluno no array deve ser um número.' })
  @IsNotEmpty({ message: 'O array de IDs de alunos não pode estar vazio.' })
  idsAlunos: number[];
}