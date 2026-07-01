import { forwardRef, Module } from '@nestjs/common';
import { EventosMedicosService } from './eventos-medicos.service';
import { EventosMedicos } from './entities/eventos-medicos.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoEventoMedicoModule } from '../tipo-evento-medico/tipo-evento-medico.module';


@Module({
  providers: [EventosMedicosService],
  imports: [
    TypeOrmModule.forFeature([EventosMedicos]),
    TipoEventoMedicoModule 
  ],
  exports: [EventosMedicosService]
})
export class EventosMedicosModule {}
