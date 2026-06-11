import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, ClassSerializerInterceptor, BadRequestException } from '@nestjs/common';
import { ResponsavelService } from './responsavel.service';
import { CreateResponsavelDto } from './dto/create-responsavel.dto';
import { UpdateResponsavelDto } from './dto/update-responsavel.dto';
import { UsuarioService } from 'src/usuario/usuario.service';
import { HashingService } from 'src/auth/hashing/hashing.service';

@Controller('responsavel')
export class ResponsavelController {
  constructor(
    private readonly responsavelService: ResponsavelService,

    private readonly usuarioService: UsuarioService,

    private readonly hashingService: HashingService
  ) { }

  @Post()
  async create(@Body() createResponsavelDto: CreateResponsavelDto) {
    if (!createResponsavelDto || !createResponsavelDto.usuario?.email) throw new BadRequestException('Dados não enviados')

    await this.usuarioService.failIfEmailExists(createResponsavelDto.usuario.email)

    const hashedPassword = await this.hashingService.hash(createResponsavelDto.usuario.senha || '')
    createResponsavelDto.usuario.senha = hashedPassword

    return await this.responsavelService.create(createResponsavelDto)
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  findAll() {
    return this.responsavelService.findAll();
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.responsavelService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateResponsavelDto: UpdateResponsavelDto) {
    return this.responsavelService.update(+id, updateResponsavelDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.responsavelService.remove(+id);
  }
}
