import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FichaMedicaAlunoService } from './ficha-medica-aluno.service';
import { CreateFichaMedicaAlunoDto } from './dto/create-ficha-medica-aluno.dto';
import { UpdateFichaMedicaAlunoDto } from './dto/update-ficha-medica-aluno.dto';

@Controller('ficha-medica-aluno')
export class FichaMedicaAlunoController {
  constructor(private readonly fichaMedicaAlunoService: FichaMedicaAlunoService) {}

  @Post()
  create(@Body() createFichaMedicaAlunoDto: CreateFichaMedicaAlunoDto) {
    return this.fichaMedicaAlunoService.create(createFichaMedicaAlunoDto);
  }

  @Get()
  findAll() {
    return this.fichaMedicaAlunoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fichaMedicaAlunoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFichaMedicaAlunoDto: UpdateFichaMedicaAlunoDto) {
    return this.fichaMedicaAlunoService.update(+id, updateFichaMedicaAlunoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fichaMedicaAlunoService.remove(+id);
  }
}
