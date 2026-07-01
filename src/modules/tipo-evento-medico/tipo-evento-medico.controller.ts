import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { TipoEventoMedicoService } from './tipo-evento-medico.service';
import { CreateTipoEventoMedicoDto } from './dto/create-tipo-evento-medico.dto';
import { UpdateTipoEventoMedicoDto } from './dto/update-tipo-evento-medico.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { AdminGuard } from 'src/common/guards/admin.guard';

@Controller('tipo-evento-medico')
export class TipoEventoMedicoController {
  constructor(private readonly tipoEventoMedicoService: TipoEventoMedicoService) {}

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Post()
  create(@Body() createTipoEventoMedicoDto: CreateTipoEventoMedicoDto) {
    return this.tipoEventoMedicoService.create(createTipoEventoMedicoDto);
  }

  @Get()
  findAll() {
    return this.tipoEventoMedicoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.tipoEventoMedicoService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: string, @Body() updateTipoEventoMedicoDto: UpdateTipoEventoMedicoDto) {
    return this.tipoEventoMedicoService.update(+id, updateTipoEventoMedicoDto);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.tipoEventoMedicoService.remove(+id);
  }
}
