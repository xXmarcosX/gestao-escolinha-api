import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFichaMedicaAlunoDto } from './dto/create-ficha-medica-aluno.dto';
import { UpdateFichaMedicaAlunoDto } from './dto/update-ficha-medica-aluno.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FichaMedicaAluno } from './entities/ficha-medica-aluno.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FichaMedicaAlunoService {
  constructor(
    @InjectRepository(FichaMedicaAluno)
    private readonly fichaMedicaRepository: Repository<FichaMedicaAluno>,
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
      relations: {
        alergias: true,
        eventosMedicos: {
          tipoEventoMedico: true,
        }
      },
      select: {
        alergias: {
          tipoAlergia: true
        },
        eventosMedicos: {
          dataEvento: true,
          descricaoEvento: true,
          tipoEventoMedico: {
            evento: true
          }
        }
      }
    })
  }

  async findOne(id: number) {
    const fichaMedica = await this.fichaMedicaRepository.findOne({
      where: { id },
      relations: ['alergias', 'eventosMedicos', 'eventosMedicos.tipoEventoMedico'],
    });

    if (!fichaMedica) {
      throw new NotFoundException(`Ficha médica com o id ${id} não encontrada.`);
    }

    return fichaMedica;
  }

  async update(id: number, updateFichaMedicaAlunoDto: UpdateFichaMedicaAlunoDto) {
    const fichaMedica = await this.fichaMedicaRepository.preload({
      id,
      ...updateFichaMedicaAlunoDto,
      alergias: updateFichaMedicaAlunoDto.alergiasIds?.map(id => ({ id })),
    });

    if (!fichaMedica) {
      throw new NotFoundException(`Ficha médica com o id ${id} não encontrada.`);
    }

    return this.fichaMedicaRepository.save(fichaMedica);
  }

  async remove(id: number) {
    const fichaMedica = await this.findOne(id)

    return this.fichaMedicaRepository.delete(fichaMedica)
  }
}
