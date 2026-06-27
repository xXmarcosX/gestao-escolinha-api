import { Module } from '@nestjs/common';
import { TipoEventoMedicoService } from './tipo-evento-medico.service';
import { TipoEventoMedicoController } from './tipo-evento-medico.controller';
import { TipoEventoMedico } from './entities/tipo-evento-medico.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [TipoEventoMedicoController],
  providers: [TipoEventoMedicoService],
  imports: [TypeOrmModule.forFeature([TipoEventoMedico])]
})
export class TipoEventoMedicoModule {}
