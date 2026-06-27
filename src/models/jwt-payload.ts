import { UsuarioPerfil } from "src/modules/usuario/entities/usuario-perfil.enum"

export type JwtPayload = {
  sub: string,
  email: string,
  primeiroNomeUsuario: string,
  sobrenomeUsuario: string,
  role: UsuarioPerfil
}