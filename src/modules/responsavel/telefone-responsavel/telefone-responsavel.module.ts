import { Module } from "@nestjs/common";
import { TelefoneResponsavelService } from "./telefone-responsavel.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TelefoneResponsavel } from "./entities/telefone-responsavel.entity";

@Module({
    imports: [TypeOrmModule.forFeature([TelefoneResponsavel])],
    providers: [TelefoneResponsavelService],
    exports: [TelefoneResponsavelService],
})
export class TelefoneResponsavelModule {}