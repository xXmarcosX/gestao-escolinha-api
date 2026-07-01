import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { TipoPagamentoService } from './tipo-pagamento.service';
import { CreateTipoPagamentoDto } from './dto/create-tipo-pagamento.dto';
import { UpdateTipoPagamentoDto } from './dto/update-tipo-pagamento.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { AdminGuard } from 'src/common/guards/admin.guard';

@Controller('tipo-pagamento')
export class TipoPagamentoController {
  constructor(private readonly tipoPagamentoService: TipoPagamentoService) {}

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Post()
  create(@Body() createTipoPagamentoDto: CreateTipoPagamentoDto) {
    return this.tipoPagamentoService.create(createTipoPagamentoDto);
  }

  @Get()
  findAll() {
    return this.tipoPagamentoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.tipoPagamentoService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: string, @Body() updateTipoPagamentoDto: UpdateTipoPagamentoDto) {
    return this.tipoPagamentoService.update(+id, updateTipoPagamentoDto);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.tipoPagamentoService.remove(+id);
  }
}

