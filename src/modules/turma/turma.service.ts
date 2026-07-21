import { BadRequestException, ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateTurmaDto } from './dto/create-turma.dto';
import { UpdateTurmaDto } from './dto/update-turma.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Turma } from './entities/turma.entity';
import { Repository } from 'typeorm';
import { InstrutorService } from 'src/modules/instrutor/instrutor.service';
import { UsuarioService } from 'src/modules/usuario/usuario.service';
import { InsertAlunoTurmaDto } from './dto/insert-aluno-turma.dto';
import { AlunoService } from '../aluno/aluno.service';

@Injectable()
export class TurmaService {
  constructor(
    @InjectRepository(Turma)
    private readonly turmaRepository: Repository<Turma>,
    private readonly instrutorService: InstrutorService,
    private readonly usuarioService: UsuarioService,
    private readonly alunoService: AlunoService
  ) { }

  async create(createTurmaDto: CreateTurmaDto) {
    const instrutor = await this.instrutorService.findOne(createTurmaDto.instrutorId)

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

    const turma = await this.turmaRepository.preload({
      id: id,
      ...updateTurmaDto,
      instrutor: (
        updateTurmaDto.instrutorId ?
          await this.instrutorService.findOne(updateTurmaDto.instrutorId) : undefined)
    })

    if (!turma) throw new NotFoundException(`Turma não cadastrada.`)

    return this.turmaRepository.save(turma)
  }

  async remove(id: number) {
    const turma = await this.turmaRepository.findOne({
      where: { id },
      relations: ['alunos'],
    });

    if (!turma) throw new NotFoundException('Turma não encontrada');

    if (turma.alunos && turma.alunos.length > 0) {
      throw new ForbiddenException('Não é possível deletar uma turma com alunos cadastrados.');
    }

    return this.turmaRepository.remove(turma)
  }

  async insertAlunos(idsAlunos: InsertAlunoTurmaDto, idTurma: number) {
    for (const id of idsAlunos.idsAlunos) {
      await this.alunoService.insertAlunoTurma(id, idTurma);
    }

    return this.alunoService.findAllByTurmaId(idTurma)
  }
}
