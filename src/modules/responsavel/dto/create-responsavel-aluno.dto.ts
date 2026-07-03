import { IsNotEmpty, IsString } from "class-validator";

export class CreateResponsavelAlunoDto {
  @IsNotEmpty()
  @IsString()
  cpf: string;
}