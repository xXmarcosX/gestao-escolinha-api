import { IsNegative, IsNotEmpty, IsString } from "class-validator";

export class CreateAlergiaDto {
    @IsString()
    @IsNotEmpty()
    tipoAlergia?: string
}
