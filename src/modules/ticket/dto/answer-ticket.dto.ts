import { IsNotEmpty, IsString } from "class-validator";

export class AnswerTicketDto {
  @IsString({ message: "A resposta deve ser uma string." })
  @IsNotEmpty({ message: "A resposta não pode estar vazia." })
  resposta: string;
}