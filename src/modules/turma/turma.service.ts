import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTurmaDto } from './dto/create-turma.dto';
import { UpdateTurmaDto } from './dto/update-turma.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Turma } from './entities/turma.entity';
import { Repository } from 'typeorm';
import { InstrutorService } from 'src/modules/instrutor/instrutor.service';
import { UsuarioService } from 'src/modules/usuario/usuario.service';

@Injectable()
export class TurmaService {
  constructor(
    @InjectRepository(Turma)
    private readonly turmaRepository: Repository<Turma>,
    private readonly instrutorService: InstrutorService,
    private readonly usuarioService: UsuarioService
  ) { }

  async create(createTurmaDto: CreateTurmaDto) {
    const instrutor = await this.instrutorService.findByUserCpf(createTurmaDto.instrutor.cpf)

    const turmaCriada = this.turmaRepository.create({
      ...createTurmaDto,
      instrutor: instrutor
    })

    return this.turmaRepository.save(turmaCriada)
  }

  findAll() {
    return this.turmaRepository.find({
      relations: {
        instrutor: {
          telefones: true
        }
      },
      select: {
        instrutor: {
          primeiroNome: true,
          sobrenome: true,
          telefones: {
            numero: true
          }
        }
      }
    })
  }

  async findOne(id: number) {
    const turma = await this.turmaRepository.findOneBy({ id })

    if (!turma) throw new BadRequestException('Turma não encontrada.')

    return turma;
  }

  async update(id: number, updateTurmaDto: UpdateTurmaDto) {
    if (!updateTurmaDto) throw new BadRequestException('Dados não enviados.')
    if (updateTurmaDto.instrutor?.cpf) {
      await this.usuarioService.failIfCpfNotExists(updateTurmaDto.instrutor.cpf)
    }

    const instrutor = updateTurmaDto.instrutor?.cpf ? await this.instrutorService.findByUserCpf(updateTurmaDto.instrutor.cpf ) : undefined

    const turma = await this.turmaRepository.preload({
      id: id,
      ...updateTurmaDto,
      instrutor
    })

    if (!turma) throw new NotFoundException(`Turma não cadastrada.`)

    return this.turmaRepository.save(turma)
  }

  async remove(id: number) {
    const turma = await this.findOne(id)

    return this.turmaRepository.remove(turma)
  }
}
