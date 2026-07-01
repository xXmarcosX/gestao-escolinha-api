import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, ParseIntPipe, UseGuards } from '@nestjs/common';
import { AlergiaService } from './alergia.service';
import { CreateAlergiaDto } from './dto/create-alergia.dto';
import { UpdateAlergiaDto } from './dto/update-alergia.dto';
import { AdminGuard } from 'src/common/guards/admin.guard';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

@Controller('alergia')
export class AlergiaController {
  constructor(private readonly alergiaService: AlergiaService) { }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Post()
  create(@Body() createAlergiaDto: CreateAlergiaDto) {
    return this.alergiaService.create(createAlergiaDto);
  }

  @Get()
  findAll() {
    return this.alergiaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.alergiaService.findOne(+id);
  }
  
  @UseGuards(JwtAuthGuard, AdminGuard)
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: string, @Body() updateAlergiaDto: UpdateAlergiaDto) {
    return this.alergiaService.update(+id, updateAlergiaDto);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.alergiaService.remove(+id);
  }
}
