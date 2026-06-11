import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { AlergiaService } from './alergia.service';
import { CreateAlergiaDto } from './dto/create-alergia.dto';
import { UpdateAlergiaDto } from './dto/update-alergia.dto';

@Controller('alergia')
export class AlergiaController {
  constructor(private readonly alergiaService: AlergiaService) { }

  @Post()
  create(@Body() createAlergiaDto: CreateAlergiaDto) {
    return this.alergiaService.create(createAlergiaDto);
  }

  @Get()
  findAll() {
    return this.alergiaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.alergiaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAlergiaDto: UpdateAlergiaDto) {
    return this.alergiaService.update(+id, updateAlergiaDto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.alergiaService.remove(+id);
  }
}
