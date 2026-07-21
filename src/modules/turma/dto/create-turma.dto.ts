import { IsNotEmpty, IsNumber, IsString, ValidateNested } from "class-validator";

export class CreateTurmaDto {
  @IsString()
  @IsNotEmpty()
  nomeTurma: string;

  @IsNumber()
  @IsNotEmpty()
  instrutorId: number;
}
