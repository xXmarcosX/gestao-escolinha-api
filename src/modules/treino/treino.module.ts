import { Module } from '@nestjs/common';
import { TreinoService } from './treino.service';
import { TreinoController } from './treino.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Treino } from './entities/treino.entity';
import { InstrutorModule } from '../instrutor/instrutor.module';
import { TurmaModule } from '../turma/turma.module';
import { LocalTreinoModule } from '../local-treino/local-treino.module';

@Module({
  controllers: [TreinoController],
  providers: [TreinoService],
  imports: [
    TypeOrmModule.forFeature([Treino]),
    InstrutorModule,
    TurmaModule,
    LocalTreinoModule
  ]
})
export class TreinoModule {}
