import { ResponsavelResponseDto } from "src/modules/responsavel/dto/responsavel-response.dto";

export class NewTicketResponseDto {
  id: number;
  assunto: string;
  conteudo: string;
  isRespondido: boolean;
  dataEmitido: Date;
  responsavel: ResponsavelResponseDto;

  constructor(init: NewTicketResponseDto) { 
    this.id = init.id;
    this.assunto = init.assunto;
    this.conteudo = init.conteudo;
    this.isRespondido = init.isRespondido;
    this.dataEmitido = init.dataEmitido;
    this.responsavel = new ResponsavelResponseDto(init.responsavel);
  }
}