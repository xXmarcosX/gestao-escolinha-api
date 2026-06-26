import { Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsOptional, IsString, MaxLength, ValidateNested } from "class-validator";
import { CreateUsuarioDto } from "src/usuario/dto/create-usuario.dto";

export class CreateFuncionarioDto {
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
}
