import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateFuncionarioDto } from './dto/create-funcionario.dto';
import { UpdateFuncionarioDto } from './dto/update-funcionario.dto';
import { UsuarioService } from 'src/modules/usuario/usuario.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Funcionario } from './entities/funcionario.entity';
import { Repository } from 'typeorm';
import { HashingService } from '../auth/hashing/hashing.service';

@Injectable()
export class FuncionarioService {
  constructor(
    @InjectRepository(Funcionario)
    private readonly funcionarioRepostory: Repository<Funcionario>,

    private readonly usuarioService: UsuarioService,
    private readonly hashingService: HashingService
  ) { }

  async create(createFuncionarioDto: CreateFuncionarioDto) {
    if (!createFuncionarioDto) throw new BadRequestException('Dados não enviados')

    await this.usuarioService.failIfEmailExists(createFuncionarioDto.usuario.email);
    await this.usuarioService.failIfCpfExists(createFuncionarioDto.usuario.cpf);

    const hashedPassword = await this.hashingService.hash(createFuncionarioDto.usuario.senha)
    createFuncionarioDto.usuario.senha = hashedPassword

    const usuarioCriado = createFuncionarioDto.usuario && await this.usuarioService.create(createFuncionarioDto.usuario);

    const novoResponsavel = this.funcionarioRepostory.create({
      ...createFuncionarioDto,
      usuario: usuarioCriado,
    });

    return this.funcionarioRepostory.save(novoResponsavel);
  }

  findAll() {
    return this.funcionarioRepostory.find({ relations: ['usuario'] });
  }

  async findOne(id: number) {
    const funcionario = await this.funcionarioRepostory.findOne({
      where: {
        id
      },
      relations: ['usuario']
    })

    if (!funcionario) throw new NotFoundException('Funcionário não encontrado,')

    return funcionario
  }

  async update(id: number, updateFuncionarioDto: UpdateFuncionarioDto) {
    if (!updateFuncionarioDto) {
      throw new BadRequestException('Dados não enviados.')
    }

    const responsavel = await this.findOne(id)

    if (updateFuncionarioDto.usuario?.cpf && updateFuncionarioDto.usuario.cpf !== responsavel.usuario.cpf) {
      await this.usuarioService.failIfCpfExists(updateFuncionarioDto.usuario.cpf)
    }

    this.funcionarioRepostory.merge(responsavel, updateFuncionarioDto)
    return this.funcionarioRepostory.save(responsavel)
  }

  async remove(id: number) {
    const funcionario = await this.funcionarioRepostory.findOne({
      where: { id },
      relations: ['usuario'],
    });

    if (!funcionario) {
      throw new NotFoundException('Funcionário não encontrado');
    }

    const usuarioId = funcionario.usuario?.id ? funcionario.usuario.id : -1;

    await this.usuarioService.remove(usuarioId);
    return await this.funcionarioRepostory.remove(funcionario);
  }

  async findByUserId(id: number) {
    const funcionario = await this.funcionarioRepostory.findOne({
      where: {
        usuario: { id }
      },
      relations: ['usuario']
    })

    if (!funcionario) throw new NotFoundException('Usuário não encontrado,')

    return funcionario
  }

  async findByUserCpf(cpf: string) {
    const responsavel = await this.funcionarioRepostory.findOne({
      where: {
        usuario: { cpf }
      },
      relations: ['usuario']
    })

    if (!responsavel) throw new NotFoundException('Usuário não encontrado,')

    return responsavel
  }
}
