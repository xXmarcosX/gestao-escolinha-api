import { IsEmail, IsEnum, IsNotEmpty, IsString, IsStrongPassword, MaxLength } from "class-validator";
import { UsuarioPerfil } from "../../../enums/usuario-perfil.enum";

export class CreateUsuarioDto {
  @IsEmail({}, { message: 'O e-mail fornecido é inválido.' })
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
    minNumbers: 1,
  }, {
    message: 'A senha deve conter no mínimo 6 caracteres, com pelo menos uma letra maiúscula, um número e um símbolo.'
  })
  @IsNotEmpty({ message: 'O campo senha não pode estar vazio.' })
  senha: string;

  @IsEnum(UsuarioPerfil, { message: 'Tipo de perfil inválido.' })
  @IsNotEmpty()
  tipoPerfil: UsuarioPerfil;
}
