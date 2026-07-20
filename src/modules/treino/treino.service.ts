import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTreinoDto } from './dto/create-treino.dto';
import { UpdateTreinoDto } from './dto/update-treino.dto';
import { Repository } from 'typeorm';
import { Treino } from './entities/treino.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { InstrutorService } from '../instrutor/instrutor.service';
import { TurmaService } from '../turma/turma.service';
import { LocalTreinoService } from '../local-treino/local-treino.service';

@Injectable()
export class TreinoService {
  constructor(
    @InjectRepository(Treino)
    private readonly treinoRepository: Repository<Treino>,

    private readonly instrutorService: InstrutorService,
    private readonly turmaService: TurmaService,
    private readonly localTreinoService: LocalTreinoService,
  ) { }

  async create(createTreinoDto: CreateTreinoDto) {
    const instrutor = await this.instrutorService.findOne(createTreinoDto.instrutorId)
    const turma = await this.turmaService.findOne(createTreinoDto.turmaId)
    const localTreino = await this.localTreinoService.findOne(createTreinoDto.localTreinoId)

    const treino = this.treinoRepository.create({
      ...createTreinoDto,
      instrutor,
      turma,
      localTreino
    })

    return this.treinoRepository.save(treino)
  }

  findAll() {
    return this.treinoRepository.find({
      relations: ['instrutor', 'turma', 'localTreino']
    })
  }

  async findOne(id: number) {
    const treino = await this.treinoRepository.findOne({
      where: {id},
      relations: ['instrutor', 'turma', 'localTreino']
    })

    if (!treino) throw new NotFoundException('Treino não encontrado.')

    return treino
  }

  async update(id: number, updateTreinoDto: UpdateTreinoDto) {
    if (!updateTreinoDto) throw new BadRequestException('Dados não enviados.')

    const treino = await this.treinoRepository.preload({
      id,
      ...updateTreinoDto,
      ...(updateTreinoDto.instrutorId !== undefined && {
        instrutor: {
          id: updateTreinoDto.instrutorId
        } 
      }),
      ...(updateTreinoDto.localTreinoId !== undefined && {
        localTreino: {
          id: updateTreinoDto.localTreinoId
        } 
      }),
      ...(updateTreinoDto.turmaId !== undefined && {
        turma: {
          id: updateTreinoDto.turmaId
        } 
      })
    })

    if (!treino) throw new NotFoundException('Treino não encontrado')

    return this.treinoRepository.save(treino)
  }

  async remove(id: number) {
    const treino = await this.findOne(id)

    return this.treinoRepository.remove(treino)
  }
}
