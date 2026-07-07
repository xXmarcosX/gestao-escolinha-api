import { UsuarioPerfil } from "src/enums/usuario-perfil.enum"

export type JwtPayload = {
  sub: string,
  email: string,
  primeiroNomeUsuario: string,
  sobrenomeUsuario: string,
  role: UsuarioPerfil
}