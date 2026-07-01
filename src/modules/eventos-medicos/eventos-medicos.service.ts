import { Injectable } from '@nestjs/common';
import { CreateEventosMedicosDto } from './dto/create-eventos-medicos.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EventosMedicos } from './entities/eventos-medicos.entity';
import { Repository } from 'typeorm';
import { UpdateEventosMedicosDto } from './dto/update-eventos-medicos.dto';


@Injectable()
export class EventosMedicosService {
  constructor(
    @InjectRepository(EventosMedicos) private readonly eventosMedicosRepository: Repository<EventosMedicos>
  ) {}

create(createEventosMedicosDto: CreateEventosMedicosDto) {
    return this.eventosMedicosRepository.save(createEventosMedicosDto);
  }

  findAll() {
    return this.eventosMedicosRepository.find();
  }

  findOne(id: number) {
    return this.eventosMedicosRepository.findOne({ where: { id } });
  }

  update(id: number, updateEventosMedicosDto: UpdateEventosMedicosDto) {
    return this.eventosMedicosRepository.update(id, updateEventosMedicosDto);
  }

  remove(id: number) {
    return this.eventosMedicosRepository.delete(id);
  }
}
