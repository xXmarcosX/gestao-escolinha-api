import { ConflictException, Injectable } from '@nestjs/common';
import { CreateAlunoDto } from './dto/create-aluno.dto';
import { UpdateAlunoDto } from './dto/update-aluno.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Aluno } from './entities/aluno.entity';
import { Repository } from 'typeorm';
import { ResponsavelService } from 'src/responsavel/responsavel.service';
import { UsuarioService } from 'src/usuario/usuario.service';

@Injectable()
export class AlunoService {
  constructor(
    @InjectRepository(Aluno)
    private readonly alunoRepository: Repository<Aluno>,
    private readonly responsavelService: ResponsavelService,
    private readonly usuarioService: UsuarioService
  ) { }

  async create(createAlunoDto: CreateAlunoDto) {
    await this.failIfCpfExists(createAlunoDto.cpf)
    await this.failIfEmailExists(createAlunoDto.email)
    // await this.usuarioService.failIfCpfNotExists(createAlunoDto.responsavel.cpf)

    const alunoCriado = this.alunoRepository.create(createAlunoDto)

    return this.alunoRepository.save(alunoCriado)
  }

  findAll() {
    return this.alunoRepository.find({
      relations: {
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
            id: true,
            numero: true
          },
          usuario: {
            cpf: true
          }
        }
      }
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} aluno`;
  }

  update(id: number, updateAlunoDto: UpdateAlunoDto) {
    return `This action updates a #${id} aluno`;
  }

  remove(id: number) {
    return `This action removes a #${id} aluno`;
  }

  async failIfCpfExists(cpf: string) {
    const exists = await this.alunoRepository.existsBy({cpf})

    if (exists) throw new ConflictException('CPF já cadastrado.')

    return exists
  }

  async failIfEmailExists(email: string) {
    const exists = await this.alunoRepository.existsBy({ email })

    if (exists) throw new ConflictException('E-mail já cadastrado.')

    return exists
  }
}
