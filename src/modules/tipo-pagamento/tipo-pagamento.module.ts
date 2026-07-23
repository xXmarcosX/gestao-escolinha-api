import { Module } from '@nestjs/common';
import { TipoPagamentoService } from './tipo-pagamento.service';
import { TipoPagamentoController } from './tipo-pagamento.controller';
import { TipoPagamento } from './entities/tipo-pagamento.entity';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';

@Module({
  controllers: [TipoPagamentoController],
  providers: [TipoPagamentoService],
  imports: [TypeOrmModule.forFeature([TipoPagamento])],
  exports: [TipoPagamentoService]
})
export class TipoPagamentoModule {}
