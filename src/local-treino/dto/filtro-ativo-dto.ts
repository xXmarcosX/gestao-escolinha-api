import { IsBooleanString, IsOptional } from 'class-validator';

export class FiltroAtivoDto {
  @IsOptional()
  @IsBooleanString({ message: "O valor deve ser 'true' ou 'false'" })
  ativo?: string;
}