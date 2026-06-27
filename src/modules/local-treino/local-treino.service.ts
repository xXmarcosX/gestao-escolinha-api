import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLocalTreinoDto } from './dto/create-local-treino.dto';
import { UpdateLocalTreinoDto } from './dto/update-local-treino.dto';
import { LocalTreino } from './entities/local-treino.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class LocalTreinoService {
  constructor(
    @InjectRepository(LocalTreino) private readonly localTreinoRepository: Repository<LocalTreino>
  ) { }

  create(createLocalTreinoDto: CreateLocalTreinoDto) {
    return this.localTreinoRepository.save(createLocalTreinoDto);
  }

  findAll(ativo: boolean) {
    if (ativo) return this.findActiveLocalTreino()
    else return this.localTreinoRepository.find()
  }

  async findOne(id: number) {
    const localTreino = await this.localTreinoRepository.findOneBy({ id });
    if (!localTreino) {
      throw new NotFoundException('Local de treino não encontrado');
    }
    return localTreino;
  }

  async update(id: number, updateLocalTreinoDto: UpdateLocalTreinoDto) {
    const localTreino = await this.localTreinoRepository.preload({
      id: id,
      ...updateLocalTreinoDto
    })

    if (!localTreino) throw new NotFoundException(`Local de treino com ${id} id não cadastrado`)

    return this.localTreinoRepository.save(localTreino)
  }

  async remove(id: number) {
    const localTreino = await this.findOne(id)

    return this.localTreinoRepository.delete(localTreino)
  }

  async findActiveLocalTreino() {
    return this.localTreinoRepository.find({
      where: {
        isActive: true
      }
    })
  }
}
