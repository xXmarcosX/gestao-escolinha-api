import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateResponsavelDto } from './dto/create-responsavel.dto';
import { UpdateResponsavelDto } from './dto/update-responsavel.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Responsavel } from './entities/responsavel.entity';
import { Repository } from 'typeorm';
import { UsuarioService } from 'src/modules/usuario/usuario.service';
import { HashingService } from '../auth/hashing/hashing.service';

@Injectable()
export class ResponsavelService {
  constructor(
    @InjectRepository(Responsavel)
    private readonly responsavelRepository: Repository<Responsavel>,

    private readonly usuarioService: UsuarioService,

    private readonly hashingService: HashingService
  ) { }

  async create(createResponsavelDto: CreateResponsavelDto) {
    if (!createResponsavelDto) throw new BadRequestException('Dados não enviados')

    await this.usuarioService.failIfEmailExists(createResponsavelDto.usuario.email);
    await this.usuarioService.failIfCpfExists(createResponsavelDto.usuario.cpf);

    const hashedPassword = await this.hashingService.hash(createResponsavelDto.usuario.senha)
    createResponsavelDto.usuario.senha = hashedPassword

    const usuarioCriado = await this.usuarioService.create(createResponsavelDto.usuario);

    const novoResponsavel = this.responsavelRepository.create({
      ...createResponsavelDto,
      usuario: usuarioCriado,
    });

    return this.responsavelRepository.save(novoResponsavel);
  }

  findAll() {
    return this.responsavelRepository.find({
      relations: ['usuario', 'telefones']
    });
  }

  async findOne(id: number) {
    const usuario = await this.responsavelRepository.findOne({
      where: {
        id
      },
      relations: ['usuario', 'telefones']
    });

    if (!usuario) throw new NotFoundException('Usuário não encontrado.');

    return usuario;
  }

  async update(id: number, updateResponsavelDto: UpdateResponsavelDto) {
    if (!updateResponsavelDto) {
      throw new BadRequestException('Dados não enviados.')
    }

    const responsavel = await this.findOne(id)

    if (updateResponsavelDto.usuario?.cpf && updateResponsavelDto.usuario.cpf !== responsavel.usuario.cpf) {
      await this.usuarioService.failIfCpfExists(updateResponsavelDto.usuario.cpf)
    }

    const responsavelAtualizado = await this.responsavelRepository.preload({
      id,
      ...updateResponsavelDto,
      usuario: {
        id: responsavel.usuario.id,
        ...updateResponsavelDto.usuario,
      }
    })

    if (!responsavelAtualizado) throw new BadRequestException('Responsável não encontrado.')

    return this.responsavelRepository.save(responsavelAtualizado)
  }

  async remove(id: number) {
    const responsavel = await this.responsavelRepository.findOne({
      where: { id },
      relations: ['usuario'],
    });

    if (!responsavel) {
      throw new NotFoundException('Responsável não encontrado');
    }

    const usuarioId = responsavel.usuario?.id ? responsavel.usuario.id : -1;

    await this.usuarioService.remove(usuarioId);
    return await this.responsavelRepository.remove(responsavel);
  }

  async findByUserId(id: number) {
    const responsavel = await this.responsavelRepository.findOne({
      where: {
        usuario: { id }
      },
      relations: ['usuario']
    })

    if (!responsavel) throw new NotFoundException('Usuário não encontrado,')

    return responsavel
  }

  async findByUserCpf(cpf: string) {
    const responsavel = await this.responsavelRepository.findOne({
      where: {
        usuario: { cpf }
      },
      relations: ['usuario']
    })

    if (!responsavel) throw new NotFoundException('Usuário não encontrado,')

    return responsavel
  }
}
