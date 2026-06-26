import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateInstrutorDto } from './dto/create-instrutor.dto';
import { UpdateInstrutorDto } from './dto/update-instrutor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Instrutor } from './entities/instrutor.entity';
import { Repository } from 'typeorm';
import { UsuarioService } from 'src/usuario/usuario.service';
import { HashingService } from 'src/auth/hashing/hashing.service';

@Injectable()
export class InstrutorService {
  constructor(
    @InjectRepository(Instrutor)
    private readonly instrutorRepository: Repository<Instrutor>,
    private readonly usuarioService: UsuarioService,
    private readonly hashingService: HashingService
  ) { }

  async create(createInstrutorDto: CreateInstrutorDto) {
    if (!createInstrutorDto) throw new BadRequestException('Dados não enviados')

    await this.usuarioService.failIfEmailExists(createInstrutorDto.usuario.email);
    await this.usuarioService.failIfCpfExists(createInstrutorDto.usuario.cpf);

    const hashedPassword = await this.hashingService.hash(createInstrutorDto.usuario.senha)
    createInstrutorDto.usuario.senha = hashedPassword

    const usuarioCriado = await this.usuarioService.create(createInstrutorDto.usuario);

    const novoInstrutor = this.instrutorRepository.create({
      ...createInstrutorDto,
      usuario: usuarioCriado,
    });

    return this.instrutorRepository.save(novoInstrutor);
  }

  findAll() {
    return this.instrutorRepository.find({
      relations: ['usuario', 'telefones']
    });
  }

  async findOne(id: number) {
    const instrutor = await this.instrutorRepository.findOne({
      where: {
        id
      },
      relations: ['usuario', 'telefones']
    });

    if (!instrutor) throw new NotFoundException('Instrutor não encontrado.')

    return instrutor
  }

  async update(id: number, updateInstrutorDto: UpdateInstrutorDto) {
    if (!updateInstrutorDto) {
      throw new BadRequestException('Dados não enviados.')
    }

    const instrutor = await this.findOne(id)

    if (updateInstrutorDto.usuario?.cpf && updateInstrutorDto.usuario.cpf !== instrutor.usuario.cpf) {
      await this.usuarioService.failIfCpfExists(updateInstrutorDto.usuario.cpf)
    }

    this.instrutorRepository.merge(instrutor, updateInstrutorDto)
    return this.instrutorRepository.save(instrutor)
  }

  async remove(id: number) {
    const instrutor = await this.instrutorRepository.findOne({
      where: { id },
      relations: ['usuario'],
    });

    if (!instrutor) {
      throw new NotFoundException('Instrutor não encontrado');
    }

    const usuarioId = instrutor.usuario.id

    await this.usuarioService.remove(usuarioId);
    return await this.instrutorRepository.remove(instrutor);
  }

  async findByUserId(id: number) {
    const instrutor = await this.instrutorRepository.findOne({
      where: {
        usuario: { id }
      },
      relations: ['usuario']
    })

    if (!instrutor) throw new NotFoundException('Usuário não encontrado,')

    return instrutor
  }

  async findByUserCpf(cpf: string) {
    const responsavel = await this.instrutorRepository.findOne({
      where: {
        usuario: { cpf }
      },
      relations: ['usuario']
    })

    if (!responsavel) throw new NotFoundException('Usuário não encontrado,')

    return responsavel
  }
}
