import { IsNotEmpty, IsString} from "class-validator";

export class CreateTipoPagamentoDto {
    @IsString({message:'O campo tipo de pagamento deve estar preenchido'})
    @IsNotEmpty({message:'O campo tipo de pagamento deve estar preenchido'})
    tipoPagamento: string;
}

