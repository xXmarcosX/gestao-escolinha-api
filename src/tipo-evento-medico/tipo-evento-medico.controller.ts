import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TipoEventoMedicoService } from './tipo-evento-medico.service';
import { CreateTipoEventoMedicoDto } from './dto/create-tipo-evento-medico.dto';
import { UpdateTipoEventoMedicoDto } from './dto/update-tipo-evento-medico.dto';

@Controller('tipo-evento-medico')
export class TipoEventoMedicoController {
  constructor(private readonly tipoEventoMedicoService: TipoEventoMedicoService) {}

  @Post()
  create(@Body() createTipoEventoMedicoDto: CreateTipoEventoMedicoDto) {
    return this.tipoEventoMedicoService.create(createTipoEventoMedicoDto);
  }

  @Get()
  findAll() {
    return this.tipoEventoMedicoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tipoEventoMedicoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTipoEventoMedicoDto: UpdateTipoEventoMedicoDto) {
    return this.tipoEventoMedicoService.update(+id, updateTipoEventoMedicoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tipoEventoMedicoService.remove(+id);
  }
}
