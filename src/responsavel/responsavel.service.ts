import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateResponsavelDto } from './dto/create-responsavel.dto';
import { UpdateResponsavelDto } from './dto/update-responsavel.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Responsavel } from './entities/responsavel.entity';
import { Repository } from 'typeorm';
import { UsuarioService } from 'src/usuario/usuario.service';
import { HashingService } from 'src/auth/hashing/hashing.service';

@Injectable()
export class ResponsavelService {
  constructor(
    @InjectRepository(Responsavel)
    private readonly responsavelRepository: Repository<Responsavel>,

    private readonly usuarioService: UsuarioService,

    private readonly hashingService: HashingService
  ) { }

  async create(createResponsavelDto: CreateResponsavelDto) {
    await this.usuarioService.failIfEmailExists(createResponsavelDto.usuario?.email || '');
    await this.failIfCpfExists(createResponsavelDto.cpf || '');

    if (!createResponsavelDto || !createResponsavelDto.usuario?.email) throw new BadRequestException('Dados não enviados')

    await this.usuarioService.failIfEmailExists(createResponsavelDto.usuario.email)

    const hashedPassword = await this.hashingService.hash(createResponsavelDto.usuario.senha || '')
    createResponsavelDto.usuario.senha = hashedPassword

    const usuarioCriado = createResponsavelDto.usuario && await this.usuarioService.create(createResponsavelDto.usuario);

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

    if (updateResponsavelDto.cpf && updateResponsavelDto.cpf !== responsavel.cpf) {
      await this.failIfCpfExists(updateResponsavelDto.cpf)
    }

    this.responsavelRepository.merge(responsavel, updateResponsavelDto)
    return this.responsavelRepository.save(responsavel)
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

    await this.responsavelRepository.delete(id);
    await this.usuarioService.remove(usuarioId);
  }

  async failIfCpfExists(cpf: string) {
    const exists = await this.responsavelRepository.existsBy({ cpf })

    if (exists) throw new ConflictException('CPF já cadastrado.')

    return exists
  }

  async findByUserId(id: number) {
    const responsavel = await this.responsavelRepository.findOne({
      where: {
        usuario: {id}
      },
      relations: ['usuario']
    })

    if (!responsavel) throw new NotFoundException('Usuário não encontrado,')

    return responsavel
  }
}
