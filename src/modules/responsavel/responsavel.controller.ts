import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, ClassSerializerInterceptor, UseGuards, ParseIntPipe, Req } from '@nestjs/common';
import { ResponsavelService } from './responsavel.service';
import { CreateResponsavelDto } from './dto/create-responsavel.dto';
import { UpdateResponsavelDto } from './dto/update-responsavel.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { SelfOrAdminGuard } from 'src/common/guards/self-or-admin.guard';
import { CreateTicketDto } from '../ticket/dto/create-ticket.dto';
import { TicketService } from '../ticket/ticket.service';
import type { AuthenticatedRequest } from 'src/types/authenticated-request';
import { AdminGuard } from 'src/common/guards/admin.guard';
import { NewTicketResponseDto } from '../ticket/dto/new-ticket-response.dto';
import { UpdateTicketDto } from '../ticket/dto/update-ticket.dto';
import { ResponsavelResponseDto } from './dto/responsavel-response.dto';

@Controller('responsavel')
export class ResponsavelController {
  constructor(
    private readonly responsavelService: ResponsavelService,
    private readonly ticketService: TicketService
  ) { }

  @Post()
  async create(@Body() createResponsavelDto: CreateResponsavelDto) {
    return await this.responsavelService.create(createResponsavelDto)
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Get()
  async findAll() {
    const responsaveis = await this.responsavelService.findAll();

    return responsaveis.map(resp => new ResponsavelResponseDto(resp))
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.responsavelService.findOne(+id);
  }

  @Patch('v1/:id')
  update(@Param('id', ParseIntPipe) id: string, @Body() updateResponsavelDto: UpdateResponsavelDto) {
    return this.responsavelService.update(+id, updateResponsavelDto);
  }

  @UseGuards(JwtAuthGuard, SelfOrAdminGuard)
  @Patch('v2/me/:id')
  updateAuth(@Param('id', ParseIntPipe) id: string, @Body() updateResponsavelDto: UpdateResponsavelDto) {
    return this.responsavelService.update(+id, updateResponsavelDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.responsavelService.remove(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('me/ticket')
  async createTicket(
    @Req() req: AuthenticatedRequest,
    @Body() createTicketDto: CreateTicketDto
  ) {
    const ticket = await this.ticketService.create(createTicketDto, +req.user.sub)

    return new NewTicketResponseDto(ticket)
  }

  @UseGuards(JwtAuthGuard)
  @Get('me/ticket')
  async getResponsavelTickets(
    @Req() req: AuthenticatedRequest,
  ) {
    const tickets = await this.ticketService.getResponsavelTickets(+req.user.sub)

    return tickets.map(ticket => new NewTicketResponseDto(ticket))
  }

  @UseGuards(JwtAuthGuard)
  @Patch('me/ticket/:id')
  async updateTicketTicket(
    @Req() req: AuthenticatedRequest,
    @Body() createTicketDto: UpdateTicketDto,
    @Param('id', ParseIntPipe) id: string
  ) {
    const ticket = await this.ticketService.update(createTicketDto, +req.user.sub, +id)

    return new NewTicketResponseDto(ticket)
  }

  @UseGuards(JwtAuthGuard)
  @Delete('me/ticket/:id')
  async deleteTicket(
    @Req() req: AuthenticatedRequest,
    @Param('id', ParseIntPipe) id: string
  ) {
    return this.ticketService.remove(+id, +req.user.sub)
  }
}
