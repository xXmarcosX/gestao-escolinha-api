import { Module } from '@nestjs/common';
import { MensalidadeService } from './mensalidade.service';
import { MensalidadeController } from './mensalidade.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mensalidade } from './entities/mensalidade.entity';
import { ResponsavelModule } from '../responsavel/responsavel.module';
import { TipoPagamentoModule } from '../tipo-pagamento/tipo-pagamento.module';

@Module({
  controllers: [MensalidadeController],
  providers: [MensalidadeService],
  imports: [
    TypeOrmModule.forFeature([Mensalidade]),
    ResponsavelModule,
    TipoPagamentoModule
  ]
})
export class MensalidadeModule {}
