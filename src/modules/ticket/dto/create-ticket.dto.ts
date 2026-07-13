import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTicketDto {
  @IsString({ message: 'O assunto deve ser uma string.' })
  @IsNotEmpty({ message: 'O assunto não pode estar vazio.' })
  assunto: string;

  @IsString({ message: 'O conteúdo deve ser uma string.' })
  @IsNotEmpty({ message: 'O conteúdo não pode estar vazio.' })
  conteudo: string;
}
