import { Module } from '@nestjs/common';
import { AlergiaService } from './alergia.service';
import { AlergiaController } from './alergia.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Alergia } from './entities/alergia.entity';

@Module({
  controllers: [AlergiaController],
  providers: [AlergiaService],
  imports: [TypeOrmModule.forFeature([Alergia])]
})
export class AlergiaModule {}
