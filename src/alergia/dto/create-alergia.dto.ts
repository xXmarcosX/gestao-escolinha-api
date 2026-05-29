import { IsString } from "class-validator";

export class CreateAlergiaDto {
    @IsString()
    tipoAlergia?: string
}
