import { Injectable } from '@nestjs/common';
import { CreateFichaMedicaAlunoDto } from './dto/create-ficha-medica-aluno.dto';
import { UpdateFichaMedicaAlunoDto } from './dto/update-ficha-medica-aluno.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FichaMedicaAluno } from './entities/ficha-medica-aluno.entity';
import { Repository } from 'typeorm';
import { EventosMedicosService } from '../eventos-medicos/eventos-medicos.service';

@Injectable()
export class FichaMedicaAlunoService {
  constructor(
    @InjectRepository(FichaMedicaAluno)
    private readonly fichaMedicaRepository: Repository<FichaMedicaAluno>,
    private readonly eventoMedicoService: EventosMedicosService
  ) { }

  async create(createFichaMedicaAlunoDto: CreateFichaMedicaAlunoDto) {
    const fichaMedicaCriada = this.fichaMedicaRepository.create({
      ...createFichaMedicaAlunoDto,
      alergias: createFichaMedicaAlunoDto.alergiasIds?.map(id => ({ id })),
    });

    return this.fichaMedicaRepository.save(fichaMedicaCriada)
  }

  findAll() {
    return this.fichaMedicaRepository.find({
      relations: ['alergias', 'eventosMedicos']
    })
  }

  findOne(id: number) {
    return `This action returns a #${id} fichaMedicaAluno`;
  }

  update(id: number, updateFichaMedicaAlunoDto: UpdateFichaMedicaAlunoDto) {
    return `This action updates a #${id} fichaMedicaAluno`;
  }

  remove(id: number) {
    return `This action removes a #${id} fichaMedicaAluno`;
  }
}
