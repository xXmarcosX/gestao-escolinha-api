import { Type } from "class-transformer";
import { IsBoolean, IsDate, IsEmail, IsEnum, IsNotEmpty, IsNumber, IsString, ValidateNested } from "class-validator";
import { Sexo } from "src/enums/sexo.enum";
import { CreateFichaMedicaAlunoDto } from "src/modules/ficha-medica-aluno/dto/create-ficha-medica-aluno.dto";

export class CreateAlunoDto {
  @IsString({ message: 'O primeiro nome deve ser uma string válida.' })
  @IsNotEmpty({ message: 'O primeiro nome não pode estar vazio.' })
  primeiroNome: string;

  @IsString({ message: 'O sobrenome deve ser uma string válida.' })
  @IsNotEmpty({ message: 'O sobrenome não pode estar vazio.' })
  sobrenome: string;

  @IsEmail({}, { message: 'O e-mail fornecido é inválido.' })
  @IsNotEmpty({ message: 'O e-mail não pode estar vazio.' })
  email: string;

  @IsString({ message: 'O CPF deve ser uma string válida.' })
  @IsNotEmpty({ message: 'O CPF não pode estar vazio.' })
  cpf: string;

  @IsEnum(Sexo, { message: "Sexo deve ser 'M' ou 'F'" })
  sexo: Sexo;

  @IsDate({ message: 'A data de nascimento deve ser uma data válida.' })
  @IsNotEmpty({ message: 'A data de nascimento não pode estar vazia.' })
  @Type(() => Date)
  dataNascimento: Date;

  @IsBoolean({ message: 'O campo "ativo" deve ser um valor booleano.' })
  @IsNotEmpty({ message: 'O campo "ativo" não pode estar vazio.' })
  ativo: boolean;

  @IsNumber({}, { message: 'O ID do responsável deve ser um número.' })
  @IsNotEmpty({ message: 'O ID do responsável não pode estar vazio.' })
  responsavelId: number;

  @IsNotEmpty({ message: 'A ficha médica não pode estar vazia.' })
  @ValidateNested()
  @Type(() => CreateFichaMedicaAlunoDto)
  fichaMedica: CreateFichaMedicaAlunoDto;
}
