import { UsuarioResponseDto } from "src/modules/usuario/dto/usuario-response.dto";
import { TelefoneResponsavelResponseDto } from "../telefone-responsavel/dto/telefone-responsavel-response.dto";

export class ResponsavelResponseDto {
  id: number;
  primeiroNome: string;
  sobrenome: string;
  dataNascimento: Date;
  usuario: UsuarioResponseDto;
  telefones: TelefoneResponsavelResponseDto[];

  constructor(init: ResponsavelResponseDto) {
    this.id = init.id;
    this.primeiroNome = init.primeiroNome;
    this.sobrenome = init.sobrenome;
    this.dataNascimento = init.dataNascimento;
    this.usuario = new UsuarioResponseDto(init.usuario);

    this.telefones = init.telefones.map(
      (telefone) => new TelefoneResponsavelResponseDto(telefone)
    );
  }
}