export class TelefoneResponsavelResponseDto {
  id: number;
  numero: string;

  constructor(init: TelefoneResponsavelResponseDto) {
    this.id = init.id;
    this.numero = init.numero;
  }
}