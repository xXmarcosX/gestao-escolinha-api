import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query, UseGuards } from '@nestjs/common';
import { AlunoService } from './aluno.service';
import { CreateAlunoDto } from './dto/create-aluno.dto';
import { UpdateAlunoDto } from './dto/update-aluno.dto';
import { UpdateFichaMedicaAlunoDto } from '../ficha-medica-aluno/dto/update-ficha-medica-aluno.dto';
import { FichaMedicaAlunoService } from '../ficha-medica-aluno/ficha-medica-aluno.service';
import { EventosMedicosService } from '../eventos-medicos/eventos-medicos.service';
import { FiltroAtivoDto } from 'src/models/filtro-ativo-dto';
import { CreateEventosMedicosDto } from '../eventos-medicos/dto/create-eventos-medicos.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { ResponsavelAlunoGuard } from 'src/common/guards/responsavelAluno-or-admin.guard';

@Controller('aluno')
export class AlunoController {
  constructor(
    private readonly alunoService: AlunoService,
    private readonly fichaMedicaService: FichaMedicaAlunoService,
    private readonly eventosMedicosService: EventosMedicosService
  ) { }

  @Post()
  create(@Body() createAlunoDto: CreateAlunoDto) {
    return this.alunoService.create(createAlunoDto);
  }

  @Get()
  findAll(@Query() ativo: FiltroAtivoDto) {
    const isAtivo = ativo.ativo === 'true';
    
    return this.alunoService.findAll(isAtivo);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.alunoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: string, @Body() updateAlunoDto: UpdateAlunoDto) {
    return this.alunoService.update(+id, updateAlunoDto);
  }

  @Patch(':id/ficha-medica')
  async updateFichaMedica(@Param('id', ParseIntPipe) id: string, @Body() updateFichaMedica: UpdateFichaMedicaAlunoDto) {
    const fichaMedica = await this.alunoService.findOneFichaMedica(+id)

    return this.fichaMedicaService.update(fichaMedica.id, updateFichaMedica)
  }

  @UseGuards(JwtAuthGuard, ResponsavelAlunoGuard)
  @Get(':id/ficha-medica')
  findOneFichaMedica(@Param('id', ParseIntPipe) id: number) {
    return this.alunoService.findOneFichaMedica(id)
  }

  @Post(':id/ficha-medica/evento-medico')
  async addEventoMedico(@Param('id', ParseIntPipe) id: number, @Body() createEventoMedicoDto: CreateEventosMedicosDto) {
    const fichaMedica = await this.alunoService.findOneFichaMedica(+id)

    return this.eventosMedicosService.add(fichaMedica.id, createEventoMedicoDto)
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.alunoService.remove(+id);
  }
}
