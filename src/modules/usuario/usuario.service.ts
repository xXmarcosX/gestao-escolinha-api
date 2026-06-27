import { BadRequestException, ConflictException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>
  ) { }

  create(createUsuarioDto: CreateUsuarioDto) {
    return this.usuarioRepository.save(createUsuarioDto);
  }

  findAll() {
    return this.usuarioRepository.find();
  }

  async findOne(id: number) {
    const usuario = await this.usuarioRepository.findOneBy({ id });

    if (!usuario) throw new NotFoundException('Usuário não encontrado.');

    return usuario;
  }

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    const usuario = await this.usuarioRepository.preload({
      id,
      ...updateUsuarioDto
    })

    if (!usuario) throw new NotFoundException('Usuário não cadastrado.')

    return this.usuarioRepository.save(usuario)
  }

  async remove(id: number) {
    const usuario = await this.findOne(id)

    return this.usuarioRepository.delete(usuario)
  }

  async findOneByEmail(email: string) {
    const usuario = await this.usuarioRepository.findOneBy({ email })

    return usuario
  }

  async failIfEmailExists(email: string) {
    const exists = await this.usuarioRepository.existsBy({ email })

    if (exists) throw new ConflictException('E-mail já cadastrado.')

    return exists
  }

  async findByCpf(cpf: string) {
    const instrutor = await this.usuarioRepository.findOneBy({ cpf })

    if (!instrutor) throw new BadRequestException('Usuário não encontrado.')

    return instrutor
  }

  async failIfCpfExists(cpf: string) {
    const exists = await this.usuarioRepository.existsBy({ cpf })

    if (exists) throw new ConflictException('CPF já cadastrado.')

    return exists
  }

  async failIfCpfNotExists(cpf: string) {
    const exists = await this.usuarioRepository.existsBy({ cpf })

    if (!exists) throw new ConflictException('Usuário não cadastrado.')

    return exists
  }

  async save(user: Usuario) {
    return this.usuarioRepository.save(user)
  }
}
