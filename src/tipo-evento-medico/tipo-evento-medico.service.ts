import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTipoEventoMedicoDto } from './dto/create-tipo-evento-medico.dto';
import { UpdateTipoEventoMedicoDto } from './dto/update-tipo-evento-medico.dto';
import { TipoEventoMedico } from './entities/tipo-evento-medico.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TipoEventoMedicoService {
  constructor(
    @InjectRepository(TipoEventoMedico) private readonly tipoEventoMedicoRepository: Repository<TipoEventoMedico>
  ) { }

  create(createTipoEventoMedicoDto: CreateTipoEventoMedicoDto) {
    return this.tipoEventoMedicoRepository.save(createTipoEventoMedicoDto);
  }

  findAll() {
    return this.tipoEventoMedicoRepository.find();
  }

  async findOne(id: number) {
    const tipoEventoMedico = await this.tipoEventoMedicoRepository.findOneBy({ id });
    if (!tipoEventoMedico) {
      throw new NotFoundException('Tipo de evento médico não encontrado');
    }
    return tipoEventoMedico;
  }

  async update(id: number, updateTipoEventoMedicoDto: UpdateTipoEventoMedicoDto) {
    const tipoEventoMedico = await this.tipoEventoMedicoRepository.preload({
      id: id,
      ...updateTipoEventoMedicoDto
    })

    if (!tipoEventoMedico) throw new NotFoundException(`Tipo de evento médico com ${id} id não cadastrado`)

    return this.tipoEventoMedicoRepository.save(tipoEventoMedico)
  }

  async remove(id: number) {
    const tipoEventoMedico = await this.findOne(id)

    return this.tipoEventoMedicoRepository.delete(tipoEventoMedico)
  }
}
