import { forwardRef, Module } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ticket } from './entities/ticket.entity';
import { ResponsavelModule } from '../responsavel/responsavel.module';
import { TicketController } from './ticket.controller';
import { FuncionarioModule } from '../funcionario/funcionario.module';

@Module({
  controllers: [TicketController],
  providers: [TicketService],
  exports: [TicketService],
  imports: [
    TypeOrmModule.forFeature([Ticket]),
    forwardRef(() => ResponsavelModule),
    forwardRef(() => FuncionarioModule)
  ]
})
export class TicketModule {}
