import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsOptional, IsString, MaxLength, ValidateNested } from 'class-validator';
import { CreateUsuarioDto } from 'src/modules/usuario/dto/create-usuario.dto';
import { CreateTelefoneResponsavelDto } from '../telefone-responsavel/dto/create-telefone-responsavel.dto';

export class CreateResponsavelDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(95)
  primeiroNome: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(180)
  sobrenome: string;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  dataNascimento: Date;

  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  cep: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  rua: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  numero: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(90)
  bairro: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(180)
  cidade: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(10)
  estado: string;

  @IsString()
  @IsOptional()
  @MaxLength(255)
  complemento: string;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CreateUsuarioDto)
  usuario: CreateUsuarioDto;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CreateTelefoneResponsavelDto)
  telefones: CreateTelefoneResponsavelDto[]
}
