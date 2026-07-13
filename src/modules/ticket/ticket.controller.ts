import { Controller, Get, Param, ParseIntPipe, Query, UseGuards } from "@nestjs/common";
import { TicketService } from "./ticket.service";
import { JwtAuthGuard } from "src/common/guards/jwt-auth.guard";
import { AdminGuard } from "src/common/guards/admin.guard";
import { FiltroRespondidoDto } from "../../models/filtro-respondido.dto";
import { NewTicketResponseDto } from "./dto/new-ticket-response.dto";

@Controller('ticket')
export class TicketController {
  constructor(
    private readonly ticketService: TicketService
  ) { }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: string) {
    return await this.ticketService.findOne(+id)
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Get()
  async findAll(@Query() respondido: FiltroRespondidoDto) {
    const isRespondido = respondido.respondido === 'true';
    const tickets = await this.ticketService.findAll(isRespondido)

    return tickets.map(ticket => new NewTicketResponseDto(ticket))
  }
}