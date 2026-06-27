import { Type } from "class-transformer";
import { IsNotEmpty, IsString, ValidateNested } from "class-validator";
import { CreateInstrutorTurmaDto } from "src/modules/instrutor/dto/create-instrutor-turma.dto";

export class CreateTurmaDto {
  @IsString()
  @IsNotEmpty()
  nomeTurma: string;

  @ValidateNested()
  @Type(() => CreateInstrutorTurmaDto)
  instrutor: CreateInstrutorTurmaDto;
}
