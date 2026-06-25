import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseBoolPipe } from '@nestjs/common';
import { LocalTreinoService } from './local-treino.service';
import { CreateLocalTreinoDto } from './dto/create-local-treino.dto';
import { UpdateLocalTreinoDto } from './dto/update-local-treino.dto';
import { FiltroAtivoDto } from './dto/filtro-ativo-dto';

@Controller('local-treino')
export class LocalTreinoController {
  constructor(private readonly localTreinoService: LocalTreinoService) { }

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
  findOne(@Param('id') id: string) {
    return this.localTreinoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLocalTreinoDto: UpdateLocalTreinoDto) {
    return this.localTreinoService.update(+id, updateLocalTreinoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.localTreinoService.remove(+id);
  }
}
