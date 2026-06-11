import { IsNotEmpty, IsString } from 'class-validator';

export class CreateLocalTreinoDto{
    @IsString({message:'O campo local nome deve estar preenchido'})
    @IsNotEmpty({message:'O campo local nome deve estar preenchido'})
    nomeLocal?: string;
}