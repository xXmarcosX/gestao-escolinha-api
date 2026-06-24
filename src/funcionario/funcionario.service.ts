import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateFuncionarioDto } from './dto/create-funcionario.dto';
import { UpdateFuncionarioDto } from './dto/update-funcionario.dto';
import { UsuarioService } from 'src/usuario/usuario.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Funcionario } from './entities/funcionario.entity';
import { Repository } from 'typeorm';
import { HashingService } from 'src/auth/hashing/hashing.service';

@Injectable()
export class FuncionarioService {
  constructor(
    @InjectRepository(Funcionario)
    private readonly funcionarioRepostory: Repository<Funcionario>,

    private readonly usuarioService: UsuarioService,
    private readonly hashingService: HashingService
  ) { }

  async create(createFuncionarioDto: CreateFuncionarioDto) {
    if (!createFuncionarioDto || !createFuncionarioDto.usuario?.email) throw new BadRequestException('Dados não enviados')

    await this.usuarioService.failIfEmailExists(createFuncionarioDto.usuario?.email || '');
    await this.failIfCpfExists(createFuncionarioDto.cpf || '');

    const hashedPassword = await this.hashingService.hash(createFuncionarioDto.usuario.senha || '')
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

    if (updateFuncionarioDto.cpf && updateFuncionarioDto.cpf !== responsavel.cpf) {
      await this.failIfCpfExists(updateFuncionarioDto.cpf)
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

    await this.funcionarioRepostory.delete(id);
    await this.usuarioService.remove(usuarioId);
  }

  async failIfCpfExists(cpf: string) {
    const exists = await this.funcionarioRepostory.existsBy({ cpf })

    if (exists) throw new ConflictException('CPF já cadastrado.')

    return exists
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
}
