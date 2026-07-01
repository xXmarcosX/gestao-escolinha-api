import { Injectable } from '@nestjs/common';
import { CreateEventosMedicosDto } from './dto/create-eventos-medicos.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EventosMedicos } from './entities/eventos-medicos.entity';
import { Repository } from 'typeorm';
import { UpdateEventosMedicosDto } from './dto/update-eventos-medicos.dto';
import { TipoEventoMedicoService } from '../tipo-evento-medico/tipo-evento-medico.service';
import { FichaMedicaAluno } from '../ficha-medica-aluno/entities/ficha-medica-aluno.entity';


@Injectable()
export class EventosMedicosService {
  constructor(
    @InjectRepository(EventosMedicos)
    private readonly eventosMedicosRepository: Repository<EventosMedicos>,
    private readonly tipoEventoMedicoService: TipoEventoMedicoService
  ) { }

  async create(createEventosMedicosDto: CreateEventosMedicosDto) {
    const eventoMedico = await this.tipoEventoMedicoService.findOne(createEventosMedicosDto.tipoEventoMedico)

    const eventoMedicoCriado = this.eventosMedicosRepository.create({
      ...createEventosMedicosDto,
      tipoEventoMedico: eventoMedico
    })

    return this.eventosMedicosRepository.save(eventoMedicoCriado);
  }

  findAll() {
    return this.eventosMedicosRepository.find();
  }

  findOne(id: number) {
    return this.eventosMedicosRepository.findOne({ where: { id } });
  }

  update(id: number, updateEventosMedicosDto: UpdateEventosMedicosDto) {
    return 'em andamento'
    // return this.eventosMedicosRepository.update(id, updateEventosMedicosDto);
  }

  remove(id: number) {
    return this.eventosMedicosRepository.delete(id);
  }
}
