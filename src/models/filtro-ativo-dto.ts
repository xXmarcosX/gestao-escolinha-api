import { IsBooleanString, IsOptional } from 'class-validator';

export class FiltroAtivoDto {
  @IsOptional()
  @IsBooleanString({ message: "O valor do query param deve ser 'true' ou 'false'" })
  ativo?: string;
}