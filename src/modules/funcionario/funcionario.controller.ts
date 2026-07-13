import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards, Query, Req } from '@nestjs/common';
import { FuncionarioService } from './funcionario.service';
import { CreateFuncionarioDto } from './dto/create-funcionario.dto';
import { UpdateFuncionarioDto } from './dto/update-funcionario.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { AdminGuard } from 'src/common/guards/admin.guard';
import { TicketService } from '../ticket/ticket.service';
import { FiltroRespondidoDto } from '../../models/filtro-respondido.dto';
import type { AuthenticatedRequest } from 'src/types/authenticated-request';
import { AnswerTicketDto } from '../ticket/dto/answer-ticket.dto';

@Controller('funcionario')
export class FuncionarioController {
  constructor(
    private readonly funcionarioService: FuncionarioService,
    private readonly ticketService: TicketService
  ) { }

  @Post()
  create(@Body() createFuncionarioDto: CreateFuncionarioDto) {
    return this.funcionarioService.create(createFuncionarioDto);
  }

  @Get()
  findAll() {
    return this.funcionarioService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.funcionarioService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: string, @Body() updateFuncionarioDto: UpdateFuncionarioDto) {
    return this.funcionarioService.update(+id, updateFuncionarioDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.funcionarioService.remove(+id);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Patch('me/ticket/:id')
  answerTicket(
    @Req() req: AuthenticatedRequest,
    @Body() answerTicketDto: AnswerTicketDto,
    @Param('id') ticketId: string
  ) {
    return this.ticketService.answerTicket(
      +ticketId,
      answerTicketDto,
      +req.user.sub
    )
  }
}
