import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlunoDto } from './dto/create-aluno.dto';
import { UpdateAlunoDto } from './dto/update-aluno.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Aluno } from './entities/aluno.entity';
import { Not, Repository } from 'typeorm';
import { ResponsavelService } from 'src/modules/responsavel/responsavel.service';
import { UsuarioService } from 'src/modules/usuario/usuario.service';
import { FichaMedicaAlunoService } from '../ficha-medica-aluno/ficha-medica-aluno.service';

@Injectable()
export class AlunoService {
  constructor(
    @InjectRepository(Aluno)
    private readonly alunoRepository: Repository<Aluno>,
    private readonly responsavelService: ResponsavelService,
    private readonly usuarioService: UsuarioService,
    private readonly fichaMedicaService: FichaMedicaAlunoService
  ) { }

  async create(createAlunoDto: CreateAlunoDto) {
    await this.failIfCpfExists(createAlunoDto.cpf)
    await this.failIfEmailExists(createAlunoDto.email)
    await this.usuarioService.failIfCpfNotExists(createAlunoDto.responsavel.cpf)

    const responsavel = await this.responsavelService.findByUserCpf(createAlunoDto.responsavel.cpf)

    const alunoCriado = this.alunoRepository.create({
      ...createAlunoDto,
      responsavel,
      fichaMedica: {
        ...createAlunoDto.fichaMedica,
        alergias: createAlunoDto.fichaMedica.alergiasIds?.map(id => ({ id })),
      }
    })

    return this.alunoRepository.save(alunoCriado)
  }

  findAll(isAtivo: boolean) {
    if (isAtivo) return this.findActiveAlunos()

    else return this.alunoRepository.find({
      relations: {
        fichaMedica: false,
        responsavel: {
          telefones: true,
          usuario: true
        }
      },
      select: {
        responsavel: {
          primeiroNome: true,
          sobrenome: true,
          telefones: {
            numero: true
          },
          usuario: {
            email: true
          }
        }
      }
    })
  }

  async findOne(id: number) {
    const aluno = await this.alunoRepository.findOne({
      where: { id },
      relations: {
        fichaMedica: false,
        responsavel: {
          telefones: true,
          usuario: true
        }
      },
      select: {
        responsavel: {
          id: true,
          primeiroNome: true,
          sobrenome: true,
          telefones: {
            numero: true
          },
          usuario: {
            email: true
          }
        }
      }
    })

    if (!aluno) throw new NotFoundException('Aluno não encontrado')

    return aluno
  }

  async findOneFichaMedica(id: number) {
    const fichaMedica = await this.fichaMedicaService.findOneByAlunoId(id)

    return fichaMedica
  }

  async update(id: number, updateAlunoDto: UpdateAlunoDto) {
    const aluno = await this.alunoRepository.preload({
      id,
      ...updateAlunoDto,
    })

    if (!aluno) throw new NotFoundException('Aluno não encontrado.')

    return this.alunoRepository.save(aluno)
  }

  async remove(id: number) {
    const aluno = await this.alunoRepository.findOne({
      where: { id },
      relations: ['fichaMedica']
    })

    if (!aluno) throw new NotFoundException('Aluno não encontrado')

    return await this.alunoRepository.remove(aluno)
  }

  async failIfCpfExists(cpf: string) {
    const exists = await this.alunoRepository.existsBy({ cpf })

    if (exists) throw new ConflictException('CPF já cadastrado.')

    return exists
  }

  async failIfEmailExists(email: string) {
    const exists = await this.alunoRepository.existsBy({ email })

    if (exists) throw new ConflictException('E-mail já cadastrado.')

    return exists
  }

  findActiveAlunos() {
    return this.alunoRepository.find({
      where: {
        ativo: true
      },
      relations: {
        fichaMedica: false,
        responsavel: {
          telefones: true,
          usuario: true
        }
      },
      select: {
        responsavel: {
          primeiroNome: true,
          sobrenome: true,
          telefones: {
            numero: true
          },
          usuario: {
            email: true
          }
        }
      }
    })
  }

  async insertAlunoTurma(idAluno: number, idTurma: number) {
    if (!idAluno) throw new BadRequestException('id do aluno não enviado.')

    const aluno = await this.alunoRepository.preload({
      id: idAluno,
      turma: {
        id: idTurma
      }
    })

    if (!aluno) throw new NotFoundException(`Aluno com id ${idAluno} não encontrado. `)

    return this.alunoRepository.save(aluno)
  }

  findAllByTurmaId(idTurma: number) {
    return this.alunoRepository.find({
      where: {
        turma: {
          id: idTurma
        }
      }
    })
  }
}
