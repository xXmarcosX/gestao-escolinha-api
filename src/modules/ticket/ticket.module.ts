import { forwardRef, Module } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ticket } from './entities/ticket.entity';
import { ResponsavelModule } from '../responsavel/responsavel.module';

@Module({
  providers: [TicketService],
  exports: [TicketService],
  imports: [
    TypeOrmModule.forFeature([Ticket]),
    forwardRef(() => ResponsavelModule)
  ]
})
export class TicketModule {}
