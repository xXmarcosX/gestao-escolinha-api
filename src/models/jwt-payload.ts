import { UsuarioPerfil } from "src/usuario/entities/usuario-perfil.enum"

export type JwtPayload = {
  sub: string,
  email: string,
  primeiroNomeUsuario: string,
  sobrenomeUsuario: string,
  role: UsuarioPerfil
}