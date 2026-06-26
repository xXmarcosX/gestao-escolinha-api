import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlergiaDto } from './dto/create-alergia.dto';
import { UpdateAlergiaDto } from './dto/update-alergia.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Alergia } from './entities/alergia.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AlergiaService {
  constructor(
    @InjectRepository(Alergia)
    private readonly alergiaRepository: Repository<Alergia>
  ) { }

  async create(createAlergiaDto: CreateAlergiaDto) {
    const novaAlergia = this.alergiaRepository.create(createAlergiaDto)

    return await this.alergiaRepository.save(novaAlergia)
  }

  findAll() {
    return this.alergiaRepository.find()
  }

  async findOne(id: number) {
    const alergia = await this.alergiaRepository.findOneBy({
      id: id
    })

    if (!alergia) throw new NotFoundException('Alergia não encontrada')

    return alergia
  }

  async update(id: number, updateAlergiaDto: UpdateAlergiaDto) {
    const alergia = await this.alergiaRepository.preload({
      id: id,
      ...updateAlergiaDto
    })

    if (!alergia) throw new NotFoundException(`Alergia com ${id} id não cadastrada`)

    return this.alergiaRepository.save(alergia)
  }

  async remove(id: number) {
    const alergia = await this.findOne(id)

    return this.alergiaRepository.remove(alergia)
  }
}
