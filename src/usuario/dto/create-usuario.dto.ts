import { IsEmail, IsEnum, IsNotEmpty, IsStrongPassword } from "class-validator";
import { UsuarioPerfil } from "../entities/usuario-perfil.enum";

export class CreateUsuarioDto {
  @IsEmail({}, { message: 'Forneça um e-mail válido.' })
  @IsNotEmpty()
  email?: string;

  @IsStrongPassword({
    minLength: 6,
    minUppercase: 1,
    minSymbols: 1,
    minNumbers: 1
  })
  @IsNotEmpty()
  senha?: string;

  @IsEnum(UsuarioPerfil, { message: 'Tipo de perfil inválido.' })
  @IsNotEmpty()
  tipoPerfil?: UsuarioPerfil;
}
