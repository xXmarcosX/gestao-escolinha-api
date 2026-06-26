import { IsEmail, IsEnum, IsNotEmpty, IsString, IsStrongPassword, MaxLength } from "class-validator";
import { UsuarioPerfil } from "../entities/usuario-perfil.enum";

export class CreateUsuarioDto {
  @IsEmail({}, { message: 'Forneça um e-mail válido.' })
  @IsNotEmpty()
  email: string;

  @IsString({ message: 'O CPF deve ser uma string.' })
  @IsNotEmpty({ message: 'O CPF não pode ser vazio.' })
  @MaxLength(20, { message: 'O CPF não pode ter mais de 20 caracteres.' })
  cpf: string;

  @IsStrongPassword({
    minLength: 6,
    minUppercase: 1,
    minSymbols: 1,
    minNumbers: 1
  })
  @IsNotEmpty()
  senha: string;

  @IsEnum(UsuarioPerfil, { message: 'Tipo de perfil inválido.' })
  @IsNotEmpty()
  tipoPerfil: UsuarioPerfil;
}
