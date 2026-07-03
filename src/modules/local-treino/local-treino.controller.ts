import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseBoolPipe, ParseIntPipe, UseGuards } from '@nestjs/common';
import { LocalTreinoService } from './local-treino.service';
import { CreateLocalTreinoDto } from './dto/create-local-treino.dto';
import { UpdateLocalTreinoDto } from './dto/update-local-treino.dto';
import { FiltroAtivoDto } from '../../models/filtro-ativo-dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { AdminGuard } from 'src/common/guards/admin.guard';

@Controller('local-treino')
export class LocalTreinoController {
  constructor(private readonly localTreinoService: LocalTreinoService) { }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Post()
  create(@Body() createLocalTreinoDto: CreateLocalTreinoDto) {
    return this.localTreinoService.create(createLocalTreinoDto);
  }

  @Get()
  findAll(@Query() ativo: FiltroAtivoDto) {
    const isAtivo = ativo.ativo === 'true';

    return this.localTreinoService.findAll(isAtivo);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.localTreinoService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: string, @Body() updateLocalTreinoDto: UpdateLocalTreinoDto) {
    return this.localTreinoService.update(+id, updateLocalTreinoDto);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.localTreinoService.remove(+id);
  }
}
