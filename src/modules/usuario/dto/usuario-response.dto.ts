import { UsuarioPerfil } from "src/enums/usuario-perfil.enum";

export class UsuarioResponseDto {
  id: number;
  email: string;
  tipoPerfil: UsuarioPerfil;

  constructor(init: UsuarioResponseDto) {
    this.id = init.id;
    this.email = init.email;
    this.tipoPerfil = init.tipoPerfil;
  }
}