import { Responsavel } from "src/modules/responsavel/entities/responsavel.entity";

export class NewTicketDto {
  assunto: string;
  conteudo: string;
  responsavel: Responsavel;
  isRespondido: false;
}