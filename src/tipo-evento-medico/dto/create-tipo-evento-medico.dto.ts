import { IsNotEmpty, IsString} from "class-validator";

export class CreateTipoEventoMedicoDto {
    @IsString({message:'O campo evento deve estar preenchido'})
    @IsNotEmpty({message:'O campo evento deve estar preenchido'})
    evento?: string;
}
