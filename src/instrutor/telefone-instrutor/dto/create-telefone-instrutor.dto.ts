import { IsNotEmpty, IsString } from "class-validator";

export class CreateTelefoneInstrutorDto {
  @IsString()
  @IsNotEmpty()
  numero: string;
}