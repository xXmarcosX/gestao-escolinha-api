import { IsBooleanString, IsOptional } from "class-validator";

export class FiltroRespondidoDto {
  @IsOptional()
  @IsBooleanString({ message: "O valor de respondido param deve ser 'true' ou 'false'" })
  respondido?: string;
}