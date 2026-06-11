import { IsNotEmpty, IsString } from "class-validator";

export class CreateTelefoneResponsavelDto {
  @IsString()
  @IsNotEmpty()
  numero?: string;
}