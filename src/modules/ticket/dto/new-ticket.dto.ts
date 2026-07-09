import { Responsavel } from "src/modules/responsavel/entities/responsavel.entity";

export class NewTicketDto {
  conteudo: string;
  responsavel: Responsavel;
  isRespondido: false;
}