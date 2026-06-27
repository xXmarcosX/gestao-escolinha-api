import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateInstrutorTurmaDto {
  @IsString({ message: 'O CPF deve ser uma string.' })
  @IsNotEmpty({ message: 'O CPF não pode ser vazio.' })
  @MaxLength(20, { message: 'O CPF não pode ter mais de 20 caracteres.' })
  cpf: string;
}