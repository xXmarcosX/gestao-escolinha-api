import { IsDate, IsNotEmpty, IsString } from "class-validator";

export class CreateEventosMedicosDto {
    @IsDate({message:'O campo data do evento deve estar preenchido'})
    @IsNotEmpty({message:'O campo data do evento deve estar preenchido'})
    dataEvento: Date;
    @IsString({message:'O campo local nome deve estar preenchido'})
    @IsNotEmpty({message:'O campo local nome deve estar preenchido'})
    nomeLocal: string;
}