import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TipoPagamentoService } from './tipo-pagamento.service';
import { CreateTipoPagamentoDto } from './dto/create-tipo-pagamento.dto';
import { UpdateTipoPagamentoDto } from './dto/update-tipo-pagamento.dto';

@Controller('tipo-pagamento')
export class TipoPagamentoController {
  constructor(private readonly tipoPagamentoService: TipoPagamentoService) {}

  @Post()
  create(@Body() createTipoPagamentoDto: CreateTipoPagamentoDto) {
    return this.tipoPagamentoService.create(createTipoPagamentoDto);
  }

  @Get()
  findAll() {
    return this.tipoPagamentoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tipoPagamentoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTipoPagamentoDto: UpdateTipoPagamentoDto) {
    return this.tipoPagamentoService.update(+id, updateTipoPagamentoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tipoPagamentoService.remove(+id);
  }
}

