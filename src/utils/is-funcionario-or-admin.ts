import { UsuarioPerfil } from "src/enums/usuario-perfil.enum";

export function isFuncionarioOrAdmin(userRole: UsuarioPerfil): boolean {
  return userRole === 'ADMIN' || userRole === 'FUNCIONARIO'
}