import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { TurmaService } from './turma.service';
import { CreateTurmaDto } from './dto/create-turma.dto';
import { UpdateTurmaDto } from './dto/update-turma.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { AdminGuard } from 'src/common/guards/admin.guard';
import { InsertAlunoTurmaDto } from './dto/insert-aluno-turma.dto';
import { AlunoService } from '../aluno/aluno.service';

@Controller('turma')
export class TurmaController {
  constructor(
    private readonly turmaService: TurmaService,
    private readonly alunoService: AlunoService
  ) { }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Post()
  create(@Body() createTurmaDto: CreateTurmaDto) {
    return this.turmaService.create(createTurmaDto);
  }

  @Get()
  findAll() {
    return this.turmaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.turmaService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: string, @Body() updateTurmaDto: UpdateTurmaDto) {
    return this.turmaService.update(+id, updateTurmaDto);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.turmaService.remove(+id);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Post(':id/aluno')
  insertAlunos(
    @Param('id') idTurma: string,
    @Body() idsAlunos: InsertAlunoTurmaDto
  ) {
    return this.turmaService.insertAlunos(idsAlunos, +idTurma)
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Get(':id/aluno')
  findAllAlunos(
    @Param('id') idTurma: string
  ) {
    return this.alunoService.findAllByTurmaId(+idTurma)
  }
}
