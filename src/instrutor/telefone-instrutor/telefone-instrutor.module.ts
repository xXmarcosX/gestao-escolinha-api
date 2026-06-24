import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TelefoneInstrutor } from "./entities/telefone-instrutor.entity";
import { TelefoneInstrutorService } from "./telefone-instrutor.service";

@Module({
    imports: [TypeOrmModule.forFeature([TelefoneInstrutor])],
    providers: [TelefoneInstrutorService],
    exports: [TelefoneInstrutorService],
})
export class TelefoneInstrutorModule{}