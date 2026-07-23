import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { MensalidadeService } from './mensalidade.service';
import { CreateMensalidadeDto } from './dto/create-mensalidade.dto';
import { UpdateMensalidadeDto } from './dto/update-mensalidade.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { AdminGuard } from 'src/common/guards/admin.guard';

@Controller('mensalidade')
export class MensalidadeController {
  constructor(private readonly mensalidadeService: MensalidadeService) {}

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Post()
  create(@Body() createMensalidadeDto: CreateMensalidadeDto) {
    return this.mensalidadeService.create(createMensalidadeDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mensalidadeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMensalidadeDto: UpdateMensalidadeDto) {
    return this.mensalidadeService.update(+id, updateMensalidadeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mensalidadeService.remove(+id);
  }
}
