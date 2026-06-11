import { Module } from '@nestjs/common';
import { LocalTreinoService } from './local-treino.service';
import { LocalTreinoController } from './local-treino.controller';
import { LocalTreino } from './entities/local-treino.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [LocalTreinoController],
  providers: [LocalTreinoService],
  imports: [TypeOrmModule.forFeature([LocalTreino])]
})
export class LocalTreinoModule {}
