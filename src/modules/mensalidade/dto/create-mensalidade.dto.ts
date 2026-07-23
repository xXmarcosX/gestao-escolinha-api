import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateMensalidadeDto {
  @IsNotEmpty({ message: 'O campo data de vencimento não pode ser vazio.' })
  @IsDate({ message: 'O campo data de vencimento deve ser uma data válida.' })
  @Type(() => Date)
  dataVencimento: Date;

  @IsNumber({}, { message: 'O campo preço deve ser um número.' })
  @IsNotEmpty({ message: 'O campo preço não pode ser vazio.' })
  preco: number;

  @IsNotEmpty({ message: 'O ID do responsável não pode ser vazio.' })
  @IsNumber({}, { message: 'O ID do responsável deve ser um número.' })
  responsavelId: number;
}
