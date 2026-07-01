import { Module } from '@nestjs/common';
import { EventosMedicosService } from './eventos-medicos.service';
import { EventosMedicos } from './entities/eventos-medicos.entity';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  providers: [EventosMedicosService],
  imports: [TypeOrmModule.forFeature([EventosMedicos])],
})
export class EventosMedicosModule {}
